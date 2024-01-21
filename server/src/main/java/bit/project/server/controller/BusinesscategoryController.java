package bit.project.server.controller;

import bit.project.server.dao.BusinesscategoryDao;
import bit.project.server.entity.Businesscategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/businesscategories")
public class BusinesscategoryController {

    @Autowired
    private BusinesscategoryDao businesscategoryDao;

    @GetMapping
    public List<Businesscategory> getAll(){
        return businesscategoryDao.findAll();
    }
}
