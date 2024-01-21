package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import  com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vehicletype {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "vehicletype")
    private List<Vehicle> vehicltypeList;

    @JsonIgnore
    @OneToMany(mappedBy = "vehicletype")
    private List<Valuation> vehicltypeValuationList;





    public Vehicletype(Integer id){
        this.id = id;
    }

}
