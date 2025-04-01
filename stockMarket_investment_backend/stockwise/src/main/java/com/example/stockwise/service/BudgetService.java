package com.example.stockwise.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.stockwise.model.Budget;
import com.example.stockwise.repository.BudgetRepository;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // Add or update a budget for a user
    public String setBudget(Budget budget) {
        Budget existingBudget = budgetRepository.findByUserId(budget.getUserId());
        if (existingBudget != null) {
            existingBudget.setBudgetValue(budget.getBudgetValue());
            existingBudget.setUsername(budget.getUsername());
            budgetRepository.save(existingBudget);
            return "Budget updated successfully!";
        }
        budgetRepository.save(budget);
        return "Budget set successfully!";
    }

    // Retrieve budget for a specific user
    public Budget getBudgetByUserId(String userId) {
        return budgetRepository.findByUserId(userId);
    }

    // Delete a budget for a specific user
    public boolean deleteBudget(String userId) {
        if (budgetRepository.existsByUserId(userId)) {
            budgetRepository.deleteByUserId(userId);
            return true;
        }
        return false;
    }
}
