package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.Expense;
import com.api.personal_budget.services.ExpenseService;
import com.api.personal_budget.web.dto.expense.ExpenseAmountDto;
import com.api.personal_budget.web.dto.expense.ExpenseCreateDto;
import com.api.personal_budget.web.dto.expense.ExpenseResponseDto;
import com.api.personal_budget.web.dto.mapper.ExpenseMapper;
import com.api.personal_budget.web.dto.user.UserResponseDto;
import com.api.personal_budget.web.exceptions.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Despesa", description = "Contém todas operações relativas a inserção, edição, exclusão e leitura das despesas")
@RestController
@RequestMapping("api/v1/despesas")
public class ExpenseController {
    @Autowired
    private ExpenseService service;

    @Operation(summary="Criar uma despesa",description = "Recurso para criar uma nova despesa",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Recurso criado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ExpenseResponseDto.class))),
                    @ApiResponse(responseCode = "422", description = "Recurso não processado por dados de entrada inválidos",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @PostMapping
    public ResponseEntity<ExpenseResponseDto> insert(@Valid @RequestBody ExpenseCreateDto dto){
        Expense expense = service.insert((ExpenseMapper.toExpense(dto)));
        return ResponseEntity.status(HttpStatus.CREATED).body(ExpenseMapper.toDto(expense));
    }

    @Operation(summary="Recuperar despesas",description = "Recurso para recuperar despesas do usuário que está autenticado",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso encontrado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @GetMapping
    public ResponseEntity<List<ExpenseResponseDto>> getExpensesForAuthenticatedUser() {
        List<Expense> expenses = service.getMonthExpensesForAuthenticatedUser();

        List<ExpenseResponseDto> expenseDtos = ExpenseMapper.toListDto(expenses);

        return ResponseEntity.ok(expenseDtos);
    }

    @Operation(summary="Deletar despesa",description = "Recurso para excluir uma despesa do usuário por id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Recurso excluido com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            })
    @DeleteMapping(value = "{id}")
    public ResponseEntity<Void> deleteExpenseForAuthenticatedUser(@PathVariable Long id) {
        service.deleteExpenseForAuthenticatedUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary="Atualizar despesa",description = "Recurso para atualizar o valor de uma despesa do usuário através do id",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Recurso alterado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class))),
                    @ApiResponse(responseCode = "404", description = "Recurso não encontrado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class))),
            })
    @PatchMapping(value = "{id}")
    public ResponseEntity<Void> updateExpenseForAuthenticatedUser(@PathVariable Long id, @Valid @RequestBody ExpenseAmountDto dto) {
        service.updateExpenseForAuthenticatedUser(id, dto.getAmount());
        return ResponseEntity.noContent().build();
    }

}
