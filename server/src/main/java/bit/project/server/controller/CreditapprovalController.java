package bit.project.server.controller;

import bit.project.server.dao.CreditapprovalDao;
import bit.project.server.entity.Creditapproval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/creditapprovals")
public class CreditapprovalController {

    @Autowired
    private CreditapprovalDao creditapprovalDao;

    @GetMapping
    public List<Creditapproval> getAll(){
        return creditapprovalDao.findAll();
    }
}
