package com.api.personal_budget.web.controllers;

import com.api.personal_budget.services.ReportService;
import com.api.personal_budget.web.dto.report.ReportResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Relatório", description = "Contém operação relativa a busca das despesas filtradas por mês")
@RestController
@RequestMapping("api/v1/relatorios")
public class ReportController {

    @Autowired
    ReportService service;
    @Operation(summary="Recuperar relatórios mensais do usuário autenticado",description = "Recurso para autenticar um usuário",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso encontrado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReportResponseDto.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = Void.class)))
            })
    @GetMapping
    public ResponseEntity<ReportResponseDto> generateReport(){
        return ResponseEntity.ok(service.generateReport());
    }
}
