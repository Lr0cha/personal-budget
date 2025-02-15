package com.api.personal_budget.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor @AllArgsConstructor
public class UpdatePasswordDto {
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 6, max = 8)
    private String currentPassword;
    @NotBlank
    @Size(min = 6, max = 8)
    private String newPassword;
    @NotBlank
    @Size(min = 6, max = 8)
    private String confirmPassword;
}
