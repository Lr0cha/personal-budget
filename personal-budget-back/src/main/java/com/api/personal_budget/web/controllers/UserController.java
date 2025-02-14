package com.api.personal_budget.web.controllers;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.services.UserService;
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
    public ResponseEntity<List<User>> findAll(){
        List<User> users = service.findAll();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping
    public ResponseEntity<User> insert(@RequestBody User obj){
        User user = service.insert(obj);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<User> updatePassword(@PathVariable UUID id, @RequestBody User obj){
        User user = service.updatePassword(id, obj.getPassword());
        return ResponseEntity.ok().body(user);
    }
}
