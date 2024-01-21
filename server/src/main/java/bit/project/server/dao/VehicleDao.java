package bit.project.server.dao;

import bit.project.server.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;

@RepositoryRestResource(exported=false)
public interface VehicleDao extends JpaRepository<Vehicle, Integer>{

    @Query("select new Vehicle (v.id,v.code, v.registrationno, v.chassisnumber, v.enginenumber) from Vehicle v")
    Page<Vehicle> findAllBasic(PageRequest pageRequest);


    Vehicle findByCode(String code);
    Vehicle findByRegistrationno(String registrationno);
    Vehicle findByChassisnumber(String chassisnumber);
    Vehicle findByEnginenumber(String enginenumber);


    @Query("select count(v) from Vehicle v where v.yearofmanufacture>=:startdate and v.yearofmanufacture<=:enddate")
    Long getVehicleCountByRange(@Param("startdate")LocalDate startdate, @Param("enddate")LocalDate enddate);
}

