package com.api.personal_budget.services;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    @Transactional(readOnly = true)
    public List<User> findAll(){
        return repository.findAll();
    }

    @Transactional
    public User insert(User user) {
        return repository.save(user);
    }

    @Transactional
    public User updatePassword(UUID id, String password){
        User user = repository.findById(id).get();
        user.setPassword(password);
        return user;
    }

}
