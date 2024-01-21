package bit.project.server.dao;

import bit.project.server.entity.Customer;
import bit.project.server.entity.Customerincome;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface CustomerincomeDao extends JpaRepository<Customerincome, Integer>{

}
