package com.example.stockwise.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.stockwise.model.Budget;

import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends MongoRepository<Budget, String> {

    // Find a budget by userId
    Budget findByUserId(String userId);

    // Check if a budget exists for a user
    boolean existsByUserId(String userId);

    // Delete a budget by userId
    void deleteByUserId(String userId);
}
