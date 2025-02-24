package com.api.personal_budget.services;

import com.api.personal_budget.entities.User;
import com.api.personal_budget.exceptions.ChangePasswordException;
import com.api.personal_budget.exceptions.UsernameUniqueViolationException;
import com.api.personal_budget.repositories.UserRepository;
import com.api.personal_budget.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    @Transactional(readOnly = true)
    public User findUserAuthenticated() {return SecurityUtils.getAuthenticatedUser();}

    public User insert(User user) {
        if (repository.findByUsername(user.getUsername()) != null) {
            throw new UsernameUniqueViolationException(String.format("Usuário '%s' já existe",user.getUsername()));
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return repository.save(user);
    }

    @Transactional
    public void updatePassword(String username, String currentPassword, String newPassword, String confirmPassword) {
        validatePasswords(newPassword, confirmPassword);

        User user = findUserAuthenticated();

        validateCurrentPassword(user, currentPassword, username);

        String encryptedPassword = new BCryptPasswordEncoder().encode(newPassword);

        user.setPassword(encryptedPassword);

        repository.save(user);
    }

    private void validatePasswords(String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new ChangePasswordException("Novas senhas não conferem!");
        }
    }

    private void validateCurrentPassword(User user, String currentPassword, String username) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (!passwordEncoder.matches(currentPassword, user.getPassword()) || !user.getUsername().equals(username)) {
            throw new ChangePasswordException("Senha e username atuais não conferem!");
        }
    }

    public void deleteUserAuthenticated() {
        User user = findUserAuthenticated();
        repository.delete(user);
    }
}
