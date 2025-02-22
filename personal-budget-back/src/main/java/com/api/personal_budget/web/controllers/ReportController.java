package com.api.personal_budget.web.controllers;

import com.api.personal_budget.services.ReportService;
import com.api.personal_budget.web.dto.report.ReportResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/relatorios")
public class ReportController {

    @Autowired
    ReportService service;

    @GetMapping
    public ResponseEntity<ReportResponseDto> generateReport(){
        return ResponseEntity.ok(service.generateReport());
    }
}
