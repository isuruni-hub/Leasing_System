package bit.project.server.controller;

import bit.project.server.dao.CustomerstatusDao;
import bit.project.server.dao.ValuationorganizationstatusDao;
import bit.project.server.entity.Customerstatus;
import bit.project.server.entity.Valuationorganization;
import bit.project.server.entity.Valuationorganizationstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/valuationorganizationstatuses")
public class ValuationorganizationstatusController {

    @Autowired
    private ValuationorganizationstatusDao valuationorganizationstatusDao;

    @GetMapping
    public List<Valuationorganizationstatus> getAll(){
        return valuationorganizationstatusDao.findAll();
    }
}
