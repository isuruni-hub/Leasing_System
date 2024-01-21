package bit.project.server.controller;


import bit.project.server.UsecaseList;
import bit.project.server.dao.InstallmentDao;
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
@RequestMapping("/installments")
public class InstallmentController {

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC,"tocreation");

    @Autowired private InstallmentDao installmentDao;
    @Autowired private AccessControlManager accessControlManager;

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id, HttpServletRequest request){
        accessControlManager.authorize(request, "No privilege to delete installment", UsecaseList.DELETE_CUSTOMER);

        try{
            if(installmentDao.existsById(id)) installmentDao.deleteById(id);
        }catch (DataIntegrityViolationException | RollbackException e){
            throw new ConflictException("Cannot delete. Because this installment already used in another module");
        }
    }


}
