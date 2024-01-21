package bit.project.server.dao;

import bit.project.server.entity.Offerrequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface OfferrequestDao extends JpaRepository<Offerrequest, Integer>{

    @Query("select new Offerrequest (ap.id, ap.code) from Offerrequest ap")
    Page<Offerrequest> findAllBasic(PageRequest pageRequest);





}

