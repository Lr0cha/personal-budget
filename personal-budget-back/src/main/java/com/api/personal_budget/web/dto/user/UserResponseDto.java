package com.api.personal_budget.web.dto.user;

import com.api.personal_budget.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor @AllArgsConstructor
public class UserResponseDto {
    private String username;
    private Role role;
}
