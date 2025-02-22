package com.api.personal_budget.services;

import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.web.dto.report.ReportResponseDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    ExpenseService expenseService;

    public ReportResponseDto generateReport() {
        List<Expense> expenses = expenseService.getAllExpensesForAuthenticatedUser();
        ReportResponseDto report = new ReportResponseDto();
        report.setGroupedMonthExpenses(getExpensesGroupedByMonth(expenses));
        report.setTotalAmount(calculateTotalAmount(expenses));
        return report;
    }

    private Map<String, BigDecimal> getExpensesGroupedByMonth(List<Expense> expenses) {
        return expenses.stream()
                .collect(Collectors.groupingBy(
                        expense -> expense.getCreatedIn().getYear() + "-" + expense.getCreatedIn().getMonthValue(),
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)
                ));
    }

    private BigDecimal calculateTotalAmount(List<Expense> expenses) {
        return expenses.stream()
                .map(Expense::getAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
