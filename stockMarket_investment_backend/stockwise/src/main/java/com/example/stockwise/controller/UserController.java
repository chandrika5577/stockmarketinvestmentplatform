package com.example.stockwise.controller;




import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.stockwise.model.User;
import com.example.stockwise.repository.UserRepository;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // Login user
  @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
    User existingUser = userRepository.findByEmail(user.getEmail());

    if (existingUser == null || !existingUser.getPassword().equals(user.getPassword())) {
        return ResponseEntity.badRequest().body("Invalid email or password!");
    }

    
    Map<String, Object> response = new HashMap<>();
    response.put("userId", existingUser.getUserId());
    response.put("name", existingUser.getName());
    response.put("email", existingUser.getEmail());
   
    return ResponseEntity.ok(response);
}


    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }
}