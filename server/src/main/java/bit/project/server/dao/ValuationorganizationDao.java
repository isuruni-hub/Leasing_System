package bit.project.server.dao;

import bit.project.server.entity.Valuationorganization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ValuationorganizationDao extends JpaRepository<Valuationorganization, Integer>{
    @Query("select new Valuationorganization (vo.id,vo.code,vo.name) from Valuationorganization vo")
    Page<Valuationorganization> findAllBasic(PageRequest pageRequest);

    Valuationorganization findByCode(String code);
    Valuationorganization findByName(String name);


}
