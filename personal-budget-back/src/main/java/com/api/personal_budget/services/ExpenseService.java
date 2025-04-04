package com.api.personal_budget.services;

import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.entities.User;
import com.api.personal_budget.exceptions.EntityIsNotFoundException;
import com.api.personal_budget.repositories.ExpenseRepository;
import com.api.personal_budget.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository repository;

    public Expense insert(Expense expense) {
        expense.setUser(SecurityUtils.getAuthenticatedUser());
        return repository.save(expense);
    }

    public List<Expense> getMonthExpensesForAuthenticatedUser() {
        User authenticatedUser = SecurityUtils.getAuthenticatedUser();

        int currentMonth = LocalDate.now().getMonthValue();  // Mês atual
        int currentYear = LocalDate.now().getYear();        // Ano atual

        return repository.findExpensesByUserAndCurrentMonth(authenticatedUser.getId(), currentMonth, currentYear);
    }

    public List<Expense> getAllExpensesForAuthenticatedUser() {
        User authenticatedUser = SecurityUtils.getAuthenticatedUser();

        return repository.findExpensesByUserId(authenticatedUser.getId());
    }

    private Expense findExpenseById(Long id) {
        List<Expense> expenses = getMonthExpensesForAuthenticatedUser();

        return expenses.stream()
                .filter(expense -> expense.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new EntityIsNotFoundException("Despesa não encontrada"));
    }

    public void deleteExpenseForAuthenticatedUser(Long id) {
        Expense expenseToDelete = findExpenseById(id);
        repository.delete(expenseToDelete);
    }

    public void updateExpenseForAuthenticatedUser(Long id, BigDecimal amount) {
        Expense expenseToUpdate = findExpenseById(id);

        if (amount != null && amount.compareTo(BigDecimal.ZERO) > 0) {
            expenseToUpdate.setAmount(amount);
            repository.save(expenseToUpdate);
        }
    }
}
