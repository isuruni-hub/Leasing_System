package bit.project.server.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Vehicle {
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

    private String seatingcapacity;


    @JsonIgnore
    @OneToMany(mappedBy = "vehicle")
    private List<Offerrequest> vehicleList;

    @JsonIgnore
    @OneToMany(mappedBy = "vehicle")
    private List<Valuation> valuationList;

    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;


    public Vehicle(Integer id) {
        this.id = id;
    }

    public Vehicle(Integer id,String code, String registrationno, String chassisnumber, String enginenumber){
        this.code = code;
        this.registrationno = registrationno;
        this.chassisnumber = chassisnumber;
        this.enginenumber = enginenumber;
        this.id = id;

    }

}
