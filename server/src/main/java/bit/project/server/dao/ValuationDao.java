package bit.project.server.dao;

import bit.project.server.entity.Valuation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ValuationDao extends JpaRepository<Valuation, Integer>{

    @Query("select new Valuation (va.id,va.code, va.registrationno, va.chassisnumber, va.enginenumber) from Valuation va")
    Page<Valuation> findAllBasic(PageRequest pageRequest);


    Valuation findByCode(String code);
    Valuation findByRegistrationno(String registrationno);
    Valuation findByChassisnumber(String chassisnumber);
    Valuation findByEnginenumber(String enginenumber);



}

