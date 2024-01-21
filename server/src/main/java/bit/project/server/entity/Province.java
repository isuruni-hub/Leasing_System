package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Province {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String provincecode;

    @JsonIgnore
    @OneToMany(mappedBy = "province")
    private List<Vehicle> provinceList;

    @JsonIgnore
    @OneToMany(mappedBy = "province")
    private List<Valuation> provinceValuationList;



    public Province(Integer id){
        this.id = id;
    }

}
