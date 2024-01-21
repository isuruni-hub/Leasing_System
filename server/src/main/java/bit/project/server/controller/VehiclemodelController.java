package bit.project.server.controller;

import bit.project.server.dao.VehiclemodelDao;
import bit.project.server.entity.Vehiclemodel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/vehiclemodels")
public class VehiclemodelController {

    @Autowired
    private VehiclemodelDao vehiclemodelDao;

    @GetMapping
    public List<Vehiclemodel> getAll(){
        return vehiclemodelDao.findAll();
    }
}
