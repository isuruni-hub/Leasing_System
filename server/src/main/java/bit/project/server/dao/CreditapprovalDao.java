package bit.project.server.dao;

import bit.project.server.entity.Branchmanagerapproval;
import bit.project.server.entity.Creditapproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface CreditapprovalDao extends JpaRepository<Creditapproval, Integer>{
}
