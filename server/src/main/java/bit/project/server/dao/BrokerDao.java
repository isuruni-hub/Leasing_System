package bit.project.server.dao;

import bit.project.server.entity.Broker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface BrokerDao extends JpaRepository<Broker, Integer>{
    @Query("select new Broker (b.id,b.code,b.name) from Broker b")
    Page<Broker> findAllBasic(PageRequest pageRequest);

    Broker findByCode(String code);
    Broker findByNic(String nic);


}
