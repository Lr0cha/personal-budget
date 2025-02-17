package com.api.personal_budget.web.dto.mapper;


import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.entities.enums.ExpenseType;
import com.api.personal_budget.web.dto.expense.ExpenseCreateDto;
import com.api.personal_budget.web.dto.expense.ExpenseResponseDto;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class ExpenseMapper {
    private final static ModelMapper modelMapper = new ModelMapper();

    public static Expense toExpense(ExpenseCreateDto createDto) {
        Expense expense = modelMapper.map(createDto, Expense.class);

        expense.setExpenseType(ExpenseType.valueOf(createDto.getExpenseType()));

        return expense;
    }

    public static ExpenseResponseDto toDto(Expense expense) {
        ExpenseResponseDto responseDto = modelMapper.map(expense, ExpenseResponseDto.class);

        responseDto.setExpenseType(expense.getExpenseType().name());

        return responseDto;
    }

    public static List<ExpenseResponseDto> toListDto(List<Expense> expenses){
        return expenses.stream().map(ExpenseMapper::toDto).collect(Collectors.toList());
    }
}
