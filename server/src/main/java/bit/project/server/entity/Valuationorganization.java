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
public class Valuationorganization {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private String name;

    private String contact1;

    private String contact2;

    @Lob
    private String address;

    private String email;

    private String fax;

    @ManyToOne
    private Valuationorganizationstatus valuationorganizationstatus;

    private LocalDateTime tocreation;

    @JsonIgnore
    @OneToMany(mappedBy = "valuationorganization")
    private List<Valuation> valuationorganizationList;

    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;


    public Valuationorganization(Integer id){
        this.id = id;
    }


    public Valuationorganization(Integer id, String code, String name) {
        this.code = code;
        this.name = name;
        this.id = id;

    }


}
