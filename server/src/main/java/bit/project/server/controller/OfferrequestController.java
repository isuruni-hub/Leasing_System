package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.OfferrequestDao;
import bit.project.server.entity.User;
import bit.project.server.entity.Offerrequest;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin
@RestController
@RequestMapping("/offerrequests")
public class OfferrequestController {

    @Autowired
    private OfferrequestDao offerrequestDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    public OfferrequestController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("offerrequest");
        codeConfig.setColumnName("code");
        codeConfig.setLength(8);
        codeConfig.setPrefix("OR");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page<Offerrequest> getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all offerrequests", UsecaseList.SHOW_ALL_OFFERREQUESTS);

        if(pageQuery.isEmptySearch()){
            return offerrequestDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");

        List<Offerrequest> offerrequests = offerrequestDao.findAll(DEFAULT_SORT);
        Stream<Offerrequest> stream = offerrequests.parallelStream();

        List<Offerrequest> filteredOfferrequests = stream.filter(offerrequest -> {
            if(code!=null)
                if(!offerrequest.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredOfferrequests, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Offerrequest> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all offerrequests' basic data", UsecaseList.SHOW_ALL_OFFERREQUESTS);
        return offerrequestDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Offerrequest get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get offerrequest", UsecaseList.SHOW_OFFERREQUEST_DETAILS, UsecaseList.UPDATE_OFFERREQUEST);
        Optional<Offerrequest> optionalOfferrequest = offerrequestDao.findById(id);
        if(optionalOfferrequest.isEmpty()) throw new ObjectNotFoundException("Offerrequest not found");
        return optionalOfferrequest.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete offerrequests", UsecaseList.DELETE_OFFERREQUEST);

        try{
            if(offerrequestDao.existsById(id)) offerrequestDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this offerrequest already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Offerrequest offerrequest, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new offerrequest", UsecaseList.ADD_OFFERREQUEST);

        offerrequest.setTocreation(LocalDateTime.now());
        offerrequest.setCreator(authUser);
        offerrequest.setId(null);


        EntityValidator.validate(offerrequest);

        ValidationErrorBag errorBag = new ValidationErrorBag();



        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            offerrequest.setCode(codeGenerator.getNextId(codeConfig));
            return offerrequestDao.save(offerrequest);
        });

        return new ResourceLink(offerrequest.getId(), "/offerrequests/"+offerrequest.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Offerrequest offerrequest, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update offerrequest details", UsecaseList.UPDATE_OFFERREQUEST);

        Optional<Offerrequest> optionalOfferrequest = offerrequestDao.findById(id);
        if(optionalOfferrequest.isEmpty()) throw new ObjectNotFoundException("Offerrequest not found");
        Offerrequest oldOfferrequest = optionalOfferrequest.get();

        offerrequest.setId(id);
        offerrequest.setCode(oldOfferrequest.getCode());
        offerrequest.setCreator(oldOfferrequest.getCreator());
        offerrequest.setTocreation(oldOfferrequest.getTocreation());


        EntityValidator.validate(offerrequest);

        ValidationErrorBag errorBag = new ValidationErrorBag();



        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        offerrequest = offerrequestDao.save(offerrequest);
        return new ResourceLink(offerrequest.getId(), "/offerrequests/"+offerrequest.getId());
    }

}
