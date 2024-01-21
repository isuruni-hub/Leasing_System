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
public class Valuation {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private String chassisnumber;

    private String enginenumber;

    private LocalDate yearofmanufacture;

    private LocalDate dateofregistration;

    private String color;

    private String originalcolor;

    @Lob
    private String description;

    private String enginecapacity;

    @ManyToOne
    private Fueltype fueltype;

    @ManyToOne
    private Vehiclemodel vehiclemodel;

    @ManyToOne
    private Province province;

    private String registrationno;

    private LocalDateTime tocreation;

    @ManyToOne
    private Vehiclecondition vehiclecondition;

    @ManyToOne
    private Country country;


    @ManyToOne
    private Vehicletype vehicletype;

    @ManyToOne
    private Brand brand;

    private Integer odometerreading;

    private BigDecimal marketvalue;

    private BigDecimal forcedsalesvalue;

    private LocalDate valuationdate;

    @ManyToOne
    private Valuationorganization valuationorganization;

    @ManyToOne
    private Vehicle vehicle;

    @ManyToOne
    private Valuationstatus valuationstatus;

    @JsonIgnore
    @OneToMany(mappedBy = "valuation")
    private List<Offerrequest> valuationList;


    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;


    public Valuation(Integer id) {
        this.id = id;
    }

    public Valuation(Integer id, String code, String registrationno, String chassisnumber, String enginenumber){
        this.code = code;
        this.registrationno = registrationno;
        this.chassisnumber = chassisnumber;
        this.enginenumber = enginenumber;
        this.id = id;

    }

}
