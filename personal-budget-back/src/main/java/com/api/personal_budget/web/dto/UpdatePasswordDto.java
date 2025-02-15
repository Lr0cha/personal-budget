package com.api.personal_budget.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor @AllArgsConstructor
public class UpdatePasswordDto {
    private String username;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
