package bit.project.server.controller;

import bit.project.server.dao.ProvinceDao;
import bit.project.server.entity.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/provinces")
public class ProvinceController {

    @Autowired
    private ProvinceDao provinceDao;

    @GetMapping
    public List<Province> getAll(){
        return provinceDao.findAll();
    }
}
