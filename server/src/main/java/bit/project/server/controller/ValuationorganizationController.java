package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.ValuationorganizationDao;
import bit.project.server.entity.Valuationorganization;
import bit.project.server.entity.User;
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
@RequestMapping("/valuationorganizations")
public class ValuationorganizationController {

    @Autowired
    private ValuationorganizationDao valuationorganizationDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    public ValuationorganizationController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("valuationorganization");
        codeConfig.setColumnName("code");
        codeConfig.setLength(8);
        codeConfig.setPrefix("VO");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all valuationorganizations", UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);

        if(pageQuery.isEmptySearch()){
            return valuationorganizationDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");
        String name = pageQuery.getSearchParam("name");
        Integer valuationorganizationstatusId = pageQuery.getSearchParamAsInteger("valuationorganizationstatus");


        List<Valuationorganization> valuationorganizations = valuationorganizationDao.findAll(DEFAULT_SORT);
        Stream<Valuationorganization> stream = valuationorganizations.parallelStream();

        List<Valuationorganization> filteredValuationorganizations = stream.filter(valuationorganization -> {
            if(code!=null)
                if(!valuationorganization.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            if(name!=null)
                if(!valuationorganization.getName().toLowerCase().contains(name.toLowerCase())) return false;
            if(valuationorganizationstatusId!=null)
                if(!valuationorganization.getValuationorganizationstatus().getId().equals(valuationorganizationstatusId)) return false;
            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredValuationorganizations, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Valuationorganization> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all valuationorganizations' basic data", UsecaseList.SHOW_ALL_VALUATIONORGANIZATIONS);
        return valuationorganizationDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Valuationorganization get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get valuationorganizations", UsecaseList.SHOW_VALUATIONORGANIZATION_DETAILS, UsecaseList.UPDATE_VALUATIONORGANIZATION);
        Optional<Valuationorganization> optionalValuationorganization = valuationorganizationDao.findById(id);
        if(optionalValuationorganization.isEmpty()) throw new ObjectNotFoundException("Valuationorganization not found");
        return optionalValuationorganization.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete valuationorganizations", UsecaseList.DELETE_VALUATIONORGANIZATION);

        try{
            if(valuationorganizationDao.existsById(id)) valuationorganizationDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this valuationorganization already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Valuationorganization valuationorganization, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new valuationorganization", UsecaseList.ADD_VALUATIONORGANIZATION);

        valuationorganization.setTocreation(LocalDateTime.now());
        valuationorganization.setCreator(authUser);
        valuationorganization.setId(null);

        EntityValidator.validate(valuationorganization);

        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(valuationorganization.getName() != null){
            Valuationorganization valuationorganizationByName = valuationorganizationDao.findByName(valuationorganization.getName());
            if(valuationorganizationByName!=null) errorBag.add("name","name already exists");
        }


        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            valuationorganization.setCode(codeGenerator.getNextId(codeConfig));
            return valuationorganizationDao.save(valuationorganization);
        });

        return new ResourceLink(valuationorganization.getId(), "/valuationorganizations/"+valuationorganization.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Valuationorganization valuationorganization, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update valuationorganization details", UsecaseList.UPDATE_VALUATIONORGANIZATION);

        Optional<Valuationorganization> optionalValuationorganization = valuationorganizationDao.findById(id);
        if(optionalValuationorganization.isEmpty()) throw new ObjectNotFoundException("Valuationorganization not found");
        Valuationorganization oldValuationorganization = optionalValuationorganization.get();

        valuationorganization.setId(id);
        valuationorganization.setCode(oldValuationorganization.getCode());
        valuationorganization.setCreator(oldValuationorganization.getCreator());
        valuationorganization.setTocreation(oldValuationorganization.getTocreation());


        EntityValidator.validate(valuationorganization);

        ValidationErrorBag errorBag = new ValidationErrorBag();



        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        valuationorganization = valuationorganizationDao.save(valuationorganization);
        return new ResourceLink(valuationorganization.getId(), "/valuationorganizations/"+valuationorganization.getId());
    }

}
