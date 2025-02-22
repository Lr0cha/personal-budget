package com.api.personal_budget.web.dto.report;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Setter @Getter @NoArgsConstructor
public class ReportResponseDto {
    Map<String, BigDecimal> groupedMonthExpenses;
    BigDecimal totalAmount;
}
