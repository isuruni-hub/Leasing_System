package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.InstallmentDao;
import bit.project.server.dao.OfferDao;
import bit.project.server.entity.*;
import bit.project.server.util.dto.PageQuery;
import bit.project.server.util.dto.ResourceLink;
import bit.project.server.util.exception.ConflictException;
import bit.project.server.util.exception.DataValidationException;
import bit.project.server.util.exception.ObjectNotFoundException;
import bit.project.server.util.helper.CodeGenerator;
import bit.project.server.util.helper.PageHelper;
import bit.project.server.util.helper.PersistHelper;
import bit.project.server.util.security.AccessControlManager;
import bit.project.server.util.validation.EntityValidator;
import bit.project.server.util.validation.ValidationErrorBag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping("/offers")
public class OfferController {

    @Autowired
    private InstallmentDao installmentDao;
    @Autowired
    private OfferDao offerDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");

    public OfferController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("offer");
        codeConfig.setColumnName("code");
        codeConfig.setLength(10);
        codeConfig.setPrefix("OF");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page<Offer> getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all offers", UsecaseList.SHOW_ALL_OFFERS);

        if(pageQuery.isEmptySearch()){
            return offerDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");
        Integer productcategoryId  = pageQuery.getSearchParamAsInteger("productcategory");

        List<Offer> offers = offerDao.findAll(DEFAULT_SORT);
        Stream<Offer> stream = offers.parallelStream();

        List<Offer> filteredOffers = stream.filter(offer -> {
            if(code!=null)
                if(!offer.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            if(productcategoryId!=null)
                if(!offer.getProductcategory().getId().equals(productcategoryId)) return false;


            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredOffers, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Offer> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all offers' basic data", UsecaseList.SHOW_ALL_OFFERS);
        return offerDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Offer get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get offer", UsecaseList.SHOW_OFFER_DETAILS, UsecaseList.UPDATE_OFFER);
        Optional<Offer> optionalOffer = offerDao.findById(id);
        if(optionalOffer.isEmpty()) throw new ObjectNotFoundException("Offer not found");
        return optionalOffer.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete offers", UsecaseList.DELETE_OFFER);

        try{
            if(offerDao.existsById(id)) offerDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this offer already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Offer offer, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new offer", UsecaseList.ADD_OFFER);


        offer.setTocreation(LocalDateTime.now());
        offer.setCreator(authUser);
        offer.setId(null);


        EntityValidator.validate(offer);
        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            offer.setCode(codeGenerator.getNextId(codeConfig));
            return offerDao.save(offer);
        });



        BigDecimal financingamount = offer.getFinancingamount();
        BigDecimal interestrate = offer.getInterestrate();
        BigDecimal interestamount = (financingamount.multiply(interestrate)).divide(BigDecimal.valueOf(100));
        BigDecimal amount = financingamount.add(interestamount);
        int period =  offer.getPeriodoffinancing();
        BigDecimal installmentamount = amount.divide(BigDecimal.valueOf(period));

        LocalDate now = LocalDate.now();

        for (int i = 0; i < offer.getPeriodoffinancing(); i++) {
            System.out.println(now.plusMonths(i+1));
            System.out.println(installmentamount);

            Installment installment = new Installment();
            installment.setDate(now.plusMonths(i+1));
            installment.setAmount(installmentamount);
            installment.setOffer(offer);

            PersistHelper.save(()->{
                installment.setCode(codeGenerator.getNextId(codeConfig));
                return installmentDao.save(installment);
            });



        }



        return new ResourceLink(offer.getId(), "/offers/"+offer.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Offer offer, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update offer details", UsecaseList.UPDATE_OFFER);

        Optional<Offer> optionalOffer = offerDao.findById(id);
        if(optionalOffer.isEmpty()) throw new ObjectNotFoundException("Offer not found");
        Offer oldOffer = optionalOffer.get();

        offer.setId(id);
        offer.setCreator(oldOffer.getCreator());
        offer.setTocreation(oldOffer.getTocreation());
        offer.setCode(oldOffer.getCode());

        EntityValidator.validate(offer);

        ValidationErrorBag errorBag = new ValidationErrorBag();


        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        offer = offerDao.save(offer);
        return new ResourceLink(offer.getId(), "/offers/"+offer.getId());
    }

}


