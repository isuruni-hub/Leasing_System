package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.InsurancecompanyDao;
import bit.project.server.entity.Insurancecompany;
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
@RequestMapping("/insurancecompanies")
public class InsurancecompanyrController {

    @Autowired
    private InsurancecompanyDao insurancecompanyDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");

    public InsurancecompanyrController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("insurancecompany");
        codeConfig.setColumnName("code");
        codeConfig.setLength(10);
        codeConfig.setPrefix("IN");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page<Insurancecompany> getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all insurancecompaniss", UsecaseList.SHOW_ALL_INSURANCECOMPANIES);

        if(pageQuery.isEmptySearch()){
            return insurancecompanyDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");
        String name = pageQuery.getSearchParam("name");
        Integer insurancecompanystatusId  = pageQuery.getSearchParamAsInteger("insurancecompanystatus");

        List<Insurancecompany> insurancecompanies = insurancecompanyDao.findAll(DEFAULT_SORT);
        Stream<Insurancecompany> stream = insurancecompanies.parallelStream();

        List<Insurancecompany> filteredInsurancecompanys = stream.filter(insurancecompany -> {
            if(code!=null)
                if(!insurancecompany.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            if(name!=null)
                if(!insurancecompany.getName().toLowerCase().contains(name.toLowerCase())) return false;
            if(insurancecompanystatusId!=null)
                if(!insurancecompany.getInsurancecompanystatus().getId().equals(insurancecompanystatusId)) return false;


            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredInsurancecompanys, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Insurancecompany> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all insurancecompanies' basic data", UsecaseList.SHOW_ALL_INSURANCECOMPANIES);
        return insurancecompanyDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Insurancecompany get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get insurancecompany", UsecaseList.SHOW_INSURANCECOMPANY_DETAILS, UsecaseList.UPDATE_INSURANCECOMPANY);
        Optional<Insurancecompany> optionalInsurancecompany = insurancecompanyDao.findById(id);
        if(optionalInsurancecompany.isEmpty()) throw new ObjectNotFoundException("Insurancecompany not found");
        return optionalInsurancecompany.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete insurancecompanies", UsecaseList.DELETE_INSURANCECOMPANY);

        try{
            if(insurancecompanyDao.existsById(id)) insurancecompanyDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this insurancecompany already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Insurancecompany insurancecompany, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new insurancecompany", UsecaseList.ADD_INSURANCECOMPANY);

        insurancecompany.setTocreation(LocalDateTime.now());
        insurancecompany.setCreator(authUser);
        insurancecompany.setId(null);


        EntityValidator.validate(insurancecompany);
        ValidationErrorBag errorBag = new ValidationErrorBag();


        if(insurancecompany.getName() != null){
            Insurancecompany insurancecompanyByName = insurancecompanyDao.findByName(insurancecompany.getName());
            if(insurancecompanyByName!=null) errorBag.add("name","name already exists");
        }

        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            insurancecompany.setCode(codeGenerator.getNextId(codeConfig));
            return insurancecompanyDao.save(insurancecompany);
        });

        return new ResourceLink(insurancecompany.getId(), "/insurancecompanies/"+insurancecompany.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Insurancecompany insurancecompany, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update insurancecompany details", UsecaseList.UPDATE_INSURANCECOMPANY);

        Optional<Insurancecompany> optionalInsurancecompany = insurancecompanyDao.findById(id);
        if(optionalInsurancecompany.isEmpty()) throw new ObjectNotFoundException("Insurancecompany not found");
        Insurancecompany oldInsurancecompany = optionalInsurancecompany.get();

        insurancecompany.setId(id);
        insurancecompany.setCreator(oldInsurancecompany.getCreator());
        insurancecompany.setTocreation(oldInsurancecompany.getTocreation());
        insurancecompany.setCode(oldInsurancecompany.getCode());

        EntityValidator.validate(insurancecompany);

        ValidationErrorBag errorBag = new ValidationErrorBag();


        if(insurancecompany.getName() != null){
            Insurancecompany insurancecompanyByName = insurancecompanyDao.findByName(insurancecompany.getName());
            if(insurancecompanyByName!=null)
                if(!insurancecompanyByName.getId().equals(id))
                    errorBag.add("name","name already exists");
        }

        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        insurancecompany = insurancecompanyDao.save(insurancecompany);
        return new ResourceLink(insurancecompany.getId(), "/insurancecompanys/"+insurancecompany.getId());
    }

}


