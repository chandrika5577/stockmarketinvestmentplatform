package com.example.stockwise.repository;



import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.stockwise.model.User;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Custom query to find a user by email (for login)
    User findByEmail(String email);

   
    User findByName(String name);
}
