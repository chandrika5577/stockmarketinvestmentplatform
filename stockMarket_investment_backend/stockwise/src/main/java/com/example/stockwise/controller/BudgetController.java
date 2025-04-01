package com.example.stockwise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.stockwise.model.Budget;
import com.example.stockwise.service.BudgetService;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    // Endpoint to add or update a budget
    @PostMapping("/set")
    public ResponseEntity<String> setBudget(@RequestBody Budget budget) {
        if (budget == null || budget.getUserId() == null || budget.getBudgetValue() <= 0) {
            return new ResponseEntity<>("Invalid budget data", HttpStatus.BAD_REQUEST);
        }
        try {
            String response = budgetService.setBudget(budget);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error setting budget: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to get a user's budget
    @GetMapping("/{userId}")
    public ResponseEntity<Budget> getBudget(@PathVariable("userId") String userId) {
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
        try {
            Budget budget = budgetService.getBudgetByUserId(userId);
            if (budget != null) {
                return new ResponseEntity<>(budget, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Endpoint to delete a budget by userId
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteBudget(@PathVariable("userId") String userId) {
        if (userId == null || userId.isEmpty()) {
            return new ResponseEntity<>("Invalid user ID", HttpStatus.BAD_REQUEST);
        }
        try {
            boolean deleted = budgetService.deleteBudget(userId);
            if (deleted) {
                return new ResponseEntity<>("Budget deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Budget not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error deleting budget: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
