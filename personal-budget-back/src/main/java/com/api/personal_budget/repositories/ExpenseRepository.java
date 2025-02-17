package com.api.personal_budget.repositories;

import com.api.personal_budget.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e FROM Expense e WHERE e.user.id = :userId AND MONTH(e.createdIn) = :month AND YEAR(e.createdIn) = :year")
    List<Expense> findExpensesByUserAndCurrentMonth(UUID userId, int month, int year);
}
