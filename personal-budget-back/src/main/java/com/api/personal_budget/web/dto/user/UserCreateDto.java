package com.api.personal_budget.web.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @AllArgsConstructor @NoArgsConstructor
public class UserCreateDto {
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 6, max = 8)
    private String password;
}
