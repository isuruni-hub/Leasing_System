package bit.project.server.dao;

import bit.project.server.entity.Valuationstatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface ValuationstatusDao extends JpaRepository<Valuationstatus, Integer> {
}
