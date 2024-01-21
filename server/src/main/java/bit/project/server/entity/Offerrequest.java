package bit.project.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Offerrequest {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private LocalDateTime tocreation;

    @ManyToOne
    private Vehicle vehicle;

    @ManyToOne
    private Valuation valuation;

    @ManyToOne
    private Broker broker;

    @ManyToOne
    private Supplier supplier;

    @ManyToOne
    private Branch branch;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Branchmanagerapproval branchmanagerapproval;

    @ManyToOne
    private Creditapproval creditapproval;

    @Lob
    private String description;

    private Integer duration;

    private BigDecimal amount;

    private BigDecimal rate;

    @JsonIgnore
    @OneToMany(mappedBy = "offerrequest")
    private List<Offer> offerrequestList;


    @ManyToOne
    @JsonIgnoreProperties({"creator","status","tocreation","roleList"})
    private User creator;


    public Offerrequest(Integer id){
        this.id = id;
    }

    public Offerrequest(Integer id, String code){
        this.id = id;
        this.code = code;

    }

}
