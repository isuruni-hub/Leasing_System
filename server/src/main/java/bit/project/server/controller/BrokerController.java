package bit.project.server.controller;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.stream.Stream;
import java.util.stream.Collectors;
import bit.project.server.UsecaseList;
import bit.project.server.entity.User;
import bit.project.server.entity.Broker;
import bit.project.server.dao.BrokerDao;
import org.springframework.http.HttpStatus;
import javax.persistence.RollbackException;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import javax.servlet.http.HttpServletRequest;
import bit.project.server.util.dto.PageQuery;
import bit.project.server.util.dto.ResourceLink;
import org.springframework.web.bind.annotation.*;
import bit.project.server.util.helper.PageHelper;
import org.springframework.data.domain.PageRequest;
import bit.project.server.util.helper.PersistHelper;
import bit.project.server.util.helper.CodeGenerator;
import bit.project.server.util.validation.EntityValidator;
import bit.project.server.util.exception.ConflictException;
import bit.project.server.util.validation.ValidationErrorBag;
import bit.project.server.util.security.AccessControlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import bit.project.server.util.exception.DataValidationException;
import bit.project.server.util.exception.ObjectNotFoundException;

@CrossOrigin
@RestController
@RequestMapping("/brokers")
public class BrokerController{

    @Autowired
    private BrokerDao brokerDao;

    @Autowired
    private AccessControlManager accessControlManager;

    @Autowired
    private CodeGenerator codeGenerator;

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "tocreation");
    private final CodeGenerator.CodeGeneratorConfig codeConfig;

    public BrokerController(){
        codeConfig = new CodeGenerator.CodeGeneratorConfig("broker");
        codeConfig.setColumnName("code");
        codeConfig.setLength(8);
        codeConfig.setPrefix("BR");
        codeConfig.setYearlyRenew(true);
    }

    @GetMapping
    public Page<Broker> getAll(PageQuery pageQuery, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get all brokers", UsecaseList.SHOW_ALL_BROKERS);

        if(pageQuery.isEmptySearch()){
            return brokerDao.findAll(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
        }

        String code = pageQuery.getSearchParam("code");
        String nic = pageQuery.getSearchParam("nic");
        String name = pageQuery.getSearchParam("name");


        List<Broker> brokers = brokerDao.findAll(DEFAULT_SORT);
        Stream<Broker> stream = brokers.parallelStream();

        List<Broker> filteredBrokers = stream.filter(broker -> {
            if(code!=null)
                if(!broker.getCode().toLowerCase().contains(code.toLowerCase())) return false;
            if(nic!=null)
                if(!broker.getNic().toLowerCase().contains(nic.toLowerCase())) return false;
            if(name!=null)
                if(!broker.getName().toLowerCase().contains(name.toLowerCase())) return false;
            return true;
        }).collect(Collectors.toList());

        return PageHelper.getAsPage(filteredBrokers, pageQuery.getPage(), pageQuery.getSize());

    }

    @GetMapping("/basic")
    public Page<Broker> getAllBasic(PageQuery pageQuery, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to get all brokers' basic data", UsecaseList.SHOW_ALL_BROKERS);
        return brokerDao.findAllBasic(PageRequest.of(pageQuery.getPage(), pageQuery.getSize(), DEFAULT_SORT));
    }

    @GetMapping("/{id}")
    public Broker get(@PathVariable Integer id, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to get broker", UsecaseList.SHOW_BROKER_DETAILS, UsecaseList.UPDATE_BROKER);
        Optional<Broker> optionalBroker = brokerDao.findById(id);
        if(optionalBroker.isEmpty()) throw new ObjectNotFoundException("Broker not found");
        return optionalBroker.get();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete brokers", UsecaseList.DELETE_BROKER);

        try{
            if(brokerDao.existsById(id)) brokerDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this broker already used in another module");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceLink add(@RequestBody Broker broker, HttpServletRequest request) throws InterruptedException {
        User authUser = accessControlManager.authorize(request, "No privilege to add new broker", UsecaseList.ADD_BROKER);

        broker.setTocreation(LocalDateTime.now());
        broker.setCreator(authUser);
        broker.setId(null);

        EntityValidator.validate(broker);

        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(broker.getNic() != null){
            Broker brokerByNic = brokerDao.findByNic(broker.getNic());
            if(brokerByNic!=null) errorBag.add("nic","nic already exists");
        }


        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        PersistHelper.save(()->{
            broker.setCode(codeGenerator.getNextId(codeConfig));
            return brokerDao.save(broker);
        });

        return new ResourceLink(broker.getId(), "/brokers/"+broker.getId());
    }

    @PutMapping("/{id}")
    public ResourceLink update(@PathVariable Integer id, @RequestBody Broker broker, HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilege to update broker details", UsecaseList.UPDATE_BROKER);

        Optional<Broker> optionalBroker = brokerDao.findById(id);
        if(optionalBroker.isEmpty()) throw new ObjectNotFoundException("Broker not found");
        Broker oldBroker = optionalBroker.get();

        broker.setId(id);
        broker.setCreator(oldBroker.getCreator());
        broker.setCode(oldBroker.getCode());
        broker.setTocreation(oldBroker.getTocreation());


        EntityValidator.validate(broker);

        ValidationErrorBag errorBag = new ValidationErrorBag();

        if(broker.getNic() != null){
            Broker brokerByNic = brokerDao.findByNic(broker.getNic());
            if(brokerByNic!=null)
                if(!brokerByNic.getId().equals(id))
                    errorBag.add("nic","nic already exists");
        }


        if(errorBag.count()>0) throw new DataValidationException(errorBag);

        broker = brokerDao.save(broker);
        return new ResourceLink(broker.getId(), "/brokers/"+broker.getId());
    }

}
