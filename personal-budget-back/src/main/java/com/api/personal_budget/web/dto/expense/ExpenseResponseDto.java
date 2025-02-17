package com.api.personal_budget.web.dto.expense;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
public class ExpenseResponseDto {

    private String description;

    private BigDecimal amount;

    private String expenseType;

    private LocalDate createdIn;
}
