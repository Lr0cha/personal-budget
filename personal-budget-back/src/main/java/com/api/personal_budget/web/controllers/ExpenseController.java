package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.services.ExpenseService;
import com.api.personal_budget.web.dto.expense.ExpenseAmountDto;
import com.api.personal_budget.web.dto.expense.ExpenseCreateDto;
import com.api.personal_budget.web.dto.expense.ExpenseResponseDto;
import com.api.personal_budget.web.dto.mapper.ExpenseMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/despesas")
public class ExpenseController {
    @Autowired
    private ExpenseService service;

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> insert(@Valid @RequestBody ExpenseCreateDto dto){
        Expense expense = service.insert((ExpenseMapper.toExpense(dto)));
        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseMapper.toDto(expense));
    }

    @GetMapping
    public ResponseEntity<List<ExpenseResponseDto>> getExpensesForAuthenticatedUser() {
        List<Expense> expenses = service.getExpensesForAuthenticatedUser();

        List<ExpenseResponseDto> expenseDtos = ExpenseMapper.toListDto(expenses);

        return ResponseEntity.ok(expenseDtos);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Void> deleteExpenseForAuthenticatedUser(@PathVariable Long id) {
        service.deleteExpenseForAuthenticatedUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping(value = "{id}")
    public ResponseEntity<Void> updateExpenseForAuthenticatedUser(@PathVariable Long id, @Valid @RequestBody ExpenseAmountDto dto) {
        service.updateExpenseForAuthenticatedUser(id, dto.getAmount());
        return ResponseEntity.noContent().build();
    }

}
