package com.api.personal_budget.web.dto.expense;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ExpenseAmountDto {
    @NotNull
    @Positive(message = "Valor da despesa deve ser maior que 0")
    BigDecimal amount;
}
