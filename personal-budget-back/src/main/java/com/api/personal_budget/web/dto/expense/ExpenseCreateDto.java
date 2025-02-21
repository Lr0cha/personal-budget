package com.api.personal_budget.web.dto.expense;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ExpenseCreateDto {
    @NotBlank
    @Size(min = 4, max = 30)
    private String description;

    @NotNull(message = "Campo amount sem valor")
    @Positive(message = "Valor deve ser maior que 0")
    private BigDecimal amount;

    @NotBlank(message = "Campo expenseType vazio")
    private String expenseType;
}
