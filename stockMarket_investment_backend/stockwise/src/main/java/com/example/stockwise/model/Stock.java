package com.example.stockwise.model;




import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stocks") 
public class Stock {

    @Id
    private String id; 
    private String userId; 
    private String username; 
    private String name; 
    private String symbol; 
    private double price; 
    private String exchange; 

    // Constructors
    public Stock() {}

    public Stock(String id, String userId, String username, String name, String symbol, double price, String exchange) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.exchange = exchange;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }
}
