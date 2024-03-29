package bit.project.server.controller;

import bit.project.server.dao.NationalityDao;
import bit.project.server.entity.Nationality;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/nationalities")
public class Nationalityontroller {

    @Autowired
    private NationalityDao nationalityDao;

    @GetMapping
    public List<Nationality> getAll(){
        return nationalityDao.findAll();
    }
}
