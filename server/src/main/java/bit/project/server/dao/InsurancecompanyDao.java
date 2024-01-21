package bit.project.server.dao;

import bit.project.server.entity.Insurancecompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface InsurancecompanyDao extends JpaRepository<Insurancecompany, Integer>{
    @Query("select new Insurancecompany (i.id,i.code, i.name) from Insurancecompany i")
    Page<Insurancecompany> findAllBasic(PageRequest pageRequest);

    Insurancecompany findByCode(String code);
    Insurancecompany findByName(String name);


}
