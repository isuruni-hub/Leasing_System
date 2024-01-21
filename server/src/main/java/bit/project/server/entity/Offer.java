package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Offer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private LocalDateTime tocreation;

    @ManyToOne
    private Offerrequest offerrequest;

    private BigDecimal interestrate;

    private Integer periodoffinancing;

    private BigDecimal financingamount;

    private BigDecimal documentcharges;

    private BigDecimal stampduty;

    private BigDecimal brokercommission;

    private BigDecimal insurancepremium;

    private BigDecimal rmvcharges;

    private BigDecimal incentivefee;

    @ManyToOne
    private Insurancecompany insurancecompany;

    @ManyToOne
    private Productcategory productcategory;


    public Offer(Integer id){
        this.id = id;
    }

    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;

    public Offer(Integer id, String code) {
        this.id = id;
        this.code = code;


    }


}
