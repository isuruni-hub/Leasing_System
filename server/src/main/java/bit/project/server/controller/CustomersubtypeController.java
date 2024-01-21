package bit.project.server.controller;

import bit.project.server.dao.CustomersubtypeDao;
import bit.project.server.entity.Customersubtype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/customersubtypes")
public class CustomersubtypeController {

    @Autowired
    private CustomersubtypeDao customersubtypeDao;

    @GetMapping
    public List<Customersubtype> getAll(){
        return customersubtypeDao.findAll();
    }
}
