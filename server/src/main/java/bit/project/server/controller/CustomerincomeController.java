package bit.project.server.controller;


import bit.project.server.UsecaseList;
import bit.project.server.dao.CustomerincomeDao;
import bit.project.server.util.exception.ConflictException;
import bit.project.server.util.security.AccessControlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.persistence.RollbackException;
import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/customerincomes")
public class CustomerincomeController {

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC,"tocreation");

    @Autowired private CustomerincomeDao customerincomeDao;
    @Autowired private AccessControlManager accessControlManager;

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete customerincome", UsecaseList.DELETE_CUSTOMER);

        try{
            if(customerincomeDao.existsById(id)) customerincomeDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this customerincome already used in another module");
        }
    }


}
