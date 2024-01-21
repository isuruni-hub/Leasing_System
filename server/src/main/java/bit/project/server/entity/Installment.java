package bit.project.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;


@Data
@Entity
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Installment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private LocalDate date;

    @DecimalMax(value = "99999999.99", message="Max Character count should be 10")
    @Positive(message = "Should be positive value")
    @Digits(integer = 10, fraction = 2, message ="Min Character count should be 3")
    private BigDecimal amount;

    @JsonIgnore
    @ManyToOne( fetch = FetchType.LAZY)
    private  Offer offer;

    private String code;


    public Installment(Integer id) {
        this.id = id;
    }
}
