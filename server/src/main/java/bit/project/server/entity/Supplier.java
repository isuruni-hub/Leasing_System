package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Supplier {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private LocalDateTime tocreation;

    @Lob
    private String description;

    private String name;

    private String companycontactperson;

    private String contact1;

    private String contact2;

    private String nic;

    private String passport;

    @Lob
    private String address;

    private String email;

    private String fax;

    private String companyregno;

    @ManyToOne
    private Suppliertype suppliertype;

    @ManyToOne
    private Nametitle nametitle;

    @JsonIgnore
    @OneToMany(mappedBy = "supplier")
    private List<Offerrequest> supplierList;

    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;


    public Supplier(Integer id){
        this.id = id;
    }



    public Supplier(Integer id, String code,String name) {
        this.id = id;
        this.code = code;
        this.name = name;

    }


}
