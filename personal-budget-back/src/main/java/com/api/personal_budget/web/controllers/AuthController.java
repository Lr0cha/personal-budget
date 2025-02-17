package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.exceptions.InvalidAuthenticationException;
import com.api.personal_budget.services.TokenService;
import com.api.personal_budget.web.dto.user.AuthenticationDto;
import com.api.personal_budget.web.dto.user.LoginResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationDto obj){
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
