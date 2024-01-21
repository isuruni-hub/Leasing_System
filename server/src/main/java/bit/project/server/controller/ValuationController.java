package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.ValuationDao;
import bit.project.server.entity.User;
import bit.project.server.entity.Valuation;
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
@RequestMapping("/valuations")
public class ValuationController {

    @Autowired
    private ValuationDao valuationDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    public ValuationController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("valuation");
        codeConfig.setColumnName("code");
        codeConfig.setLength(8);
        codeConfig.setPrefix("VAL");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page<Valuation> getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all valuations", UsecaseList.SHOW_ALL_VALUATIONS);

        if(pageQuery.isEmptySearch()){
            return valuationDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");
        String registrationno = pageQuery.getSearchParam("registrationno");
        Integer valuationstatusId = pageQuery.getSearchParamAsInteger("valuationstatus");
        Integer valuationorganizationId = pageQuery.getSearchParamAsInteger("valuationorganization");

        List<Valuation> valuations = valuationDao.findAll(DEFAULT_SORT);
        Stream<Valuation> stream = valuations.parallelStream();

        List<Valuation> filteredValuations = stream.filter(valuation -> {
            if(code!=null)
                if(!valuation.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            if(registrationno!=null)
                if(!valuation.getRegistrationno().toLowerCase().contains(registrationno.toLowerCase())) return false;
            if(valuationstatusId!=null)
                if(!valuation.getValuationstatus().getId().equals(valuationstatusId)) return false;
            if(valuationorganizationId!=null)
                if(!valuation.getValuationorganization().getId().equals(valuationorganizationId)) return false;
            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredValuations, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Valuation> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all valuations' basic data", UsecaseList.SHOW_ALL_VALUATIONS);
        return valuationDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Valuation get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get valuation", UsecaseList.SHOW_VALUATION_DETAILS, UsecaseList.UPDATE_VALUATION);
        Optional<Valuation> optionalValuation = valuationDao.findById(id);
        if(optionalValuation.isEmpty()) throw new ObjectNotFoundException("Valuation not found");
        return optionalValuation.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete valuations", UsecaseList.DELETE_VALUATION);

        try{
            if(valuationDao.existsById(id)) valuationDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this valuation already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Valuation valuation, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new valuation", UsecaseList.ADD_VALUATION);

        valuation.setTocreation(LocalDateTime.now());
        valuation.setCreator(authUser);
        valuation.setId(null);


        EntityValidator.validate(valuation);

        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(valuation.getRegistrationno() != null){
            Valuation valuationByRegistrationno = valuationDao.findByRegistrationno(valuation.getRegistrationno());
            if(valuationByRegistrationno!=null) errorBag.add("registrationno","Registration no already exists");
        }

        if(valuation.getChassisnumber() != null){
            Valuation valuationByChassisnumber = valuationDao.findByChassisnumber(valuation.getChassisnumber());
            if(valuationByChassisnumber!=null) errorBag.add("chassisnumber","Chassisnumber already exists");
        }

        if(valuation.getEnginenumber() != null){
            Valuation valuationByEnginenumber = valuationDao.findByEnginenumber(valuation.getEnginenumber());
            if(valuationByEnginenumber!=null) errorBag.add("enginenumber","Enginer number already exists");
        }

        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            valuation.setCode(codeGenerator.getNextId(codeConfig));
            return valuationDao.save(valuation);
        });

        return new ResourceLink(valuation.getId(), "/valuations/"+valuation.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Valuation valuation, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update valuation details", UsecaseList.UPDATE_VALUATION);

        Optional<Valuation> optionalValuation = valuationDao.findById(id);
        if(optionalValuation.isEmpty()) throw new ObjectNotFoundException("Valuation not found");
        Valuation oldValuation = optionalValuation.get();

        valuation.setId(id);
        valuation.setCode(oldValuation.getCode());
        valuation.setCreator(oldValuation.getCreator());
        valuation.setTocreation(oldValuation.getTocreation());


        EntityValidator.validate(valuation);

        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(valuation.getRegistrationno() != null){
            Valuation valuationByRegistrationno = valuationDao.findByRegistrationno(valuation.getRegistrationno());
            if(valuationByRegistrationno!=null)
                if(!valuationByRegistrationno.getId().equals(id))
                    errorBag.add("Registrationno","Registration no already exists");
        }

        if(valuation.getChassisnumber() != null){
            Valuation valuationByChassisnumber = valuationDao.findByChassisnumber(valuation.getChassisnumber());
            if(valuationByChassisnumber!=null)
                if(!valuationByChassisnumber.getId().equals(id))
                    errorBag.add("Chassisnumber","Chassis number already exists");
        }

        if(valuation.getEnginenumber() != null){
            Valuation valuationByEnginenumber = valuationDao.findByEnginenumber(valuation.getEnginenumber());
            if(valuationByEnginenumber!=null)
                if(!valuationByEnginenumber.getId().equals(id))
                    errorBag.add("Enginenumber","Engine number already exists");
        }

        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        valuation = valuationDao.save(valuation);
        return new ResourceLink(valuation.getId(), "/valuations/"+valuation.getId());
    }

}
