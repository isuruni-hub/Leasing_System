package bit.project.server.dao;

import bit.project.server.entity.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface OfferDao extends JpaRepository<Offer, Integer>{
    @Query("select new Offer (o.id, o.code) from Offer o")
    Page<Offer> findAllBasic(PageRequest pageRequest);




}
