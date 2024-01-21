package bit.project.server.dao;

import bit.project.server.entity.Branchmanagerapproval;
import bit.project.server.entity.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface BranchmanagerapprovalDao extends JpaRepository<Branchmanagerapproval, Integer>{
}
