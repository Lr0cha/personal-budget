package com.api.personal_budget.services;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.exceptions.ChangePasswordException;
import com.api.personal_budget.exceptions.EntityIsNotFoundException;
import com.api.personal_budget.exceptions.UsernameUniqueViolationException;
import com.api.personal_budget.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    @Transactional(readOnly = true)
    public List<User> findAll(){
        return repository.findAll();
    }

    public User insert(User user) {
        try{
            return repository.save(user);
        }catch(DataIntegrityViolationException ex){
            throw new UsernameUniqueViolationException(String.format("Username '%s' já existe", user.getUsername()));
        }
    }

    @Transactional
    public void updatePassword(String username, String currentPassword, String newPassword, String confirmPassword) {
        validatePasswords(newPassword, confirmPassword);

        User user = repository.findByUsername(username)
                .orElseThrow(() -> new EntityIsNotFoundException("Usuário não encontrado"));

        validateCurrentPassword(user, currentPassword, username);

        user.setPassword(newPassword);
    }

    private void validatePasswords(String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new ChangePasswordException("Novas senhas não conferem!");
        }
    }

    private void validateCurrentPassword(User user, String currentPassword, String username) {
        if (!user.getPassword().equals(currentPassword) || !user.getUsername().equals(username)) {
            throw new ChangePasswordException("Senha e username atuais não conferem!");
        }
    }
}
