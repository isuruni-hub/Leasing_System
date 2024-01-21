package bit.project.server.dao;

import bit.project.server.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RepositoryRestResource(exported=false)
public interface CustomerDao extends JpaRepository<Customer, Integer>{

    @Query("select new Customer (c.id, c.code, c.name, c.contact1, c.email) from Customer c")
    Page<Customer> findAllBasic(PageRequest pageRequest);


    Customer findByNic(String nic);
    Customer findByCode(String code);
    Customer findByName(String name);
    Customer findByContact1(String contact1);
    Customer findByEmail(String email);

    @Query("select new Customer (c.id, c.code, c.name,c.contact1, c.email)from Customer c where c.tocreation >= :dateTime")
    List<Customer> findAllByTocreationAfter(LocalDateTime dateTime);





}

