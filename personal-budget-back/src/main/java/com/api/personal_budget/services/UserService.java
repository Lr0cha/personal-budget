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
    public void updatePassword(String username, String currentPassword, String newPassword, String confirmPassword) {
        validatePasswords(newPassword, confirmPassword);

        User user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        validateCurrentPassword(user, currentPassword, username);

        user.setPassword(newPassword);
    }

    private void validatePasswords(String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("Novas senhas não conferem!");
        }
    }

    private void validateCurrentPassword(User user, String currentPassword, String username) {
        if (!user.getPassword().equals(currentPassword) || !user.getUsername().equals(username)) {
            throw new RuntimeException("Senha e/ou username atuais não conferem!");
        }
    }
}
