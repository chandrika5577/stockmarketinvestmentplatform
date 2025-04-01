package com.example.stockwise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.stockwise.model.Stock;
import com.example.stockwise.service.StockService;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    // Add a new stock
    @PostMapping("/add")
    public ResponseEntity<String> addStock(@RequestBody Stock stock) {
        try {
            String response = stockService.addStock(stock);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while adding stock");
        }
    }

    // Get all stocks for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Stock>> getStocksByUserId(@PathVariable String userId) {
        try {
            List<Stock> stocks = stockService.getStocksByUserId(userId);
            return ResponseEntity.ok(stocks);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Add a stock to the wishlist
    @PostMapping("/wishlist/add")
    public ResponseEntity<String> addToWishlist(@RequestBody Stock stock) {
        try {
            String response = stockService.addToWishlist(stock);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while adding to wishlist");
        }
    }

    // Get all wishlist stocks for a specific user
    @GetMapping("/wishlist/{userId}")
    public ResponseEntity<List<Stock>> getWishlistByUserId(@PathVariable String userId) {
        try {
            List<Stock> wishlist = stockService.getWishlistByUserId(userId);
            return ResponseEntity.ok(wishlist);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Remove a stock from the wishlist
    @PostMapping("/wishlist/remove")
    public ResponseEntity<String> removeFromWishlist(@RequestParam String stockId) {
        try {
            String response = stockService.removeFromWishlist(stockId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while removing from wishlist");
        }
    }

    // Delete a stock by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable String id) {
        try {
            String response = stockService.deleteStockById(id);
            if (response.equals("Stock deleted successfully!")) {
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting stock");
        }
    }
}
