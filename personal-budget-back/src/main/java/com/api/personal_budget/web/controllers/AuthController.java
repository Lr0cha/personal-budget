package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.exceptions.InvalidAuthenticationException;
import com.api.personal_budget.services.TokenService;
import com.api.personal_budget.web.dto.user.AuthenticationDto;
import com.api.personal_budget.web.dto.user.LoginResponseDto;
import com.api.personal_budget.web.exceptions.ErrorMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Autenticação", description = "Autentica o usuário e gera o token JWT")
@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @Operation(summary="Autenticar o usuário",description = "Recurso para autenticar um usuário",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Recurso encontrado com sucesso",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponseDto.class))),
                    @ApiResponse(responseCode = "401", description = "Recurso não autorizado",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorMessage.class)))
            })
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody AuthenticationDto obj){
        try {
            var usernameAndPassword = new UsernamePasswordAuthenticationToken(obj.username(), obj.password());
            var auth = authenticationManager.authenticate(usernameAndPassword);

            var token = tokenService.generateToken((User) auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseDto(token));
        } catch (AuthenticationException e) {
            throw new InvalidAuthenticationException("Credenciais inválidas");
        }
    }
}
