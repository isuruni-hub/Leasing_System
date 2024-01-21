package bit.project.server.controller;

import bit.project.server.dao.InsurancecompanystatusDao;
import bit.project.server.entity.Insurancecompanystatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/insurancecompanystatuses")
public class InsurancecompanystatusController {

    @Autowired
    private InsurancecompanystatusDao insurancecompanystatusDao;

    @GetMapping
    public List<Insurancecompanystatus> getAll(){
        return insurancecompanystatusDao.findAll();
    }
}
