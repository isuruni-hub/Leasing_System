package bit.project.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private LocalDateTime tocreation;

    @Lob
    private String description;

    private String name;

    private String contact1;

    private String contact2;

    private String nic;

    private String passport;

    @Lob
    private String address;

    private String email;



    @ManyToOne
    private Customertype customertype;

    @ManyToOne
    private Customersubtype customersubtype;

    @ManyToOne
    private Customerstatus customerstatus;

    private String photo;

    @ManyToOne
    private Businesscategory businesscategory;

    @ManyToOne
    private Civilstatus civilstatus;

    private String companyregno;

    private String proffesion;

    private LocalDate dob;

    @ManyToOne
    private Nationality nationality;

    @ManyToOne
    private Nametitle nametitle;

    private String cribno;

    @ManyToOne
    private Gender gender;

    @ManyToOne
    private District district;

    @OneToMany(mappedBy = "customer",  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Customerincome> customerincomeList;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Customerexpense> customerexpenseList;


    @ManyToOne
    @JsonIgnoreProperties({"creator","status","tocreation","roleList"})
    private User creator;


    public Customer(Integer id){
        this.id = id;
    }

    public Customer(Integer id, String code, String name, String contact1, String email){
        this.id = id;
        this.code = code;
        this.name = name;
        this.contact1 = contact1;
        this.email = email;
    }

}
