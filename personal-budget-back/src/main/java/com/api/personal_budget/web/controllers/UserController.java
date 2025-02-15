package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.services.UserService;
import com.api.personal_budget.web.dto.UpdatePasswordDto;
import com.api.personal_budget.web.dto.UserCreateDto;
import com.api.personal_budget.web.dto.UserResponseDto;
import com.api.personal_budget.web.dto.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/usuarios")
public class UserController {
    @Autowired
    UserService service;

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> findAll(){
        List<User> users = service.findAll();
        return ResponseEntity.ok().body(UserMapper.toListDto(users));
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> insert(@RequestBody UserCreateDto obj){
        User user = service.insert(UserMapper.toUser(obj));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.toDto(user));
    }

    @PatchMapping
    public ResponseEntity<Void> updatePassword(@RequestBody UpdatePasswordDto obj){
        service.updatePassword(obj.getUsername() , obj.getCurrentPassword(), obj.getNewPassword(), obj.getConfirmPassword());
        return ResponseEntity.noContent().build();
    }
}
