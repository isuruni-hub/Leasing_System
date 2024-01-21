package bit.project.server.controller;

import bit.project.server.dao.VehicleconditionDao;
import bit.project.server.entity.Vehiclecondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/vehicleconditions")
public class VehicleconditionController {

    @Autowired
    private VehicleconditionDao vehicleconditionDao;

    @GetMapping
    public List<Vehiclecondition> getAll(){
        return vehicleconditionDao.findAll();
    }
}
