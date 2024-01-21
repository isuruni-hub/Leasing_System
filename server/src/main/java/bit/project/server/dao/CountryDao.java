package bit.project.server.dao;

import bit.project.server.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported=false)
public interface CountryDao extends JpaRepository<Country, Integer>{
}
