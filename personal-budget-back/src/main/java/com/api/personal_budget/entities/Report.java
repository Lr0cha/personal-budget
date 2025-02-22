package com.api.personal_budget.entities;

import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class Report {
    private BigDecimal totalAmount;

    @NotNull
    @OneToMany
    private List<Expense> expenses;
}
