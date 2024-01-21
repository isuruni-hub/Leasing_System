package bit.project.server.controller;

import bit.project.server.dao.ValuationorganizationstatusDao;
import bit.project.server.dao.ValuationstatusDao;
import bit.project.server.entity.Valuationorganizationstatus;
import bit.project.server.entity.Valuationstatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/valuationstatuses")
public class ValuationstatusController {

    @Autowired
    private ValuationstatusDao valuationstatusDao;

    @GetMapping
    public List<Valuationstatus> getAll(){
        return valuationstatusDao.findAll();
    }
}
