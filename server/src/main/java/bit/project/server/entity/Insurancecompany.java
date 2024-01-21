package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Insurancecompany {
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

    private LocalDateTime tocreation;


    @ManyToOne
    private Insurancecompanystatus insurancecompanystatus;

    @ManyToOne
    @JsonIgnoreProperties({"creator","tocreation","roleList"})
    private User creator;


    public Insurancecompany(Integer id){
        this.id = id;
    }



    public Insurancecompany(Integer id,String code, String name) {
        this.code = code;
        this.name = name;
        this.id = id;

    }


}
