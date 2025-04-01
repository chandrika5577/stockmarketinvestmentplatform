package com.example.stockwise.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "budget") 
public class Budget {

    @Id
    private String id;     
    private String userId; 
    private String username;
    private double budgetValue; 

    // Constructors
    public Budget() {}

    public Budget(String id, String userId, String username, double budgetValue) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.budgetValue = budgetValue;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getBudgetValue() {
        return budgetValue;
    }

    public void setBudgetValue(double budgetValue) {
        this.budgetValue = budgetValue;
    }
}
