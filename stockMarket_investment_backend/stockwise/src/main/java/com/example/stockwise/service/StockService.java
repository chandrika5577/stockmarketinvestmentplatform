package com.example.stockwise.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.stockwise.model.Stock;
import com.example.stockwise.repository.StockRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    // Add a new stock
    public String addStock(Stock stock) {
        stockRepository.save(stock);
        return "Stock added successfully!";
    }

    // Add stock to wishlist
    public String addToWishlist(Stock stock) {
        // You can add custom logic to differentiate wishlist stocks, e.g., by appending " (Wishlist)"
        stock.setName(stock.getName() + " (Wishlist)");
        stockRepository.save(stock);
        return "Stock added to wishlist successfully!";
    }

    // Get all wishlist stocks for a specific user
    public List<Stock> getWishlistByUserId(String userId) {
        // Filter stocks by checking the naming convention or custom logic
        List<Stock> allStocks = stockRepository.findByUserId(userId);
        return allStocks.stream()
                        .filter(stock -> stock.getName().endsWith("(Wishlist)")) // Custom logic
                        .collect(Collectors.toList());
    }

    // Get all stocks for a specific user
    public List<Stock> getStocksByUserId(String userId) {
        // Exclude wishlist stocks if necessary
        return stockRepository.findByUserId(userId).stream()
                .filter(stock -> !stock.getName().endsWith("(Wishlist)")) // Exclude wishlist stocks
                .collect(Collectors.toList());
    }

    // Remove stock from wishlist
    public String removeFromWishlist(String stockId) {
        Stock stock = stockRepository.findById(stockId).orElse(null);
        if (stock != null && stock.getName().endsWith("(Wishlist)")) {
            stockRepository.deleteById(stockId);
            return "Stock removed from wishlist successfully!";
        }
        return "Wishlist stock not found!";
    }

    // Delete a stock by ID
    public String deleteStockById(String id) {
        if (stockRepository.existsById(id)) {
            stockRepository.deleteById(id);
            return "Stock deleted successfully!";
        }
        return "Stock not found!";
    }
}
