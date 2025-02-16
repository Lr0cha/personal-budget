package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/despesas")
public class ExpenseController {
    @Autowired
    private ExpenseService service;
    
}
