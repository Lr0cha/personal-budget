package com.api.personal_budget.services;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository repository;
    public List<User> findAll(){
        return repository.findAll();
    }
}
