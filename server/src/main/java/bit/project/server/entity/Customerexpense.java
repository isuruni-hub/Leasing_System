package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Customerexpense {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message="Titles required")
    @Size(min=0, max=255, message = "Maximum character count is 255 ")
    private String title;

    @DecimalMax(value = "99999999.99", message="Max Character count should be 10")
    @Positive(message = "Should be positive value")
    @Digits(integer = 10, fraction = 2, message ="Min Character count should be 3")
    private BigDecimal amount;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private  Customer customer;



    public Customerexpense(Integer id) {
        this.id = id;
    }
}
