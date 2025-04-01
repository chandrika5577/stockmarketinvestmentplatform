package com.example.stockwise.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.stockwise.model.User;
import com.example.stockwise.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    // Login user
    public String loginUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid email or password!";
        }
        return "Login successful!";
    }

    // Get user by ID
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
}