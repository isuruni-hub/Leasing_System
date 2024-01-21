package bit.project.server.controller;

import bit.project.server.dao.BranchmanagerapprovalDao;
import bit.project.server.entity.Branchmanagerapproval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/branchmanagerapprovals")
public class BranchmanagerapprovalController {

    @Autowired
    private BranchmanagerapprovalDao branchmanagerapprovalDao;

    @GetMapping
    public List<Branchmanagerapproval> getAll(){
        return branchmanagerapprovalDao.findAll();
    }
}
