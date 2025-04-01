package com.example.stockwise.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.stockwise.model.Stock;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends MongoRepository<Stock, String> {

    // Custom query to find all stocks by userId
    List<Stock> findByUserId(String userId);

    // Custom query to find a specific stock by its symbol and userId
    Stock findBySymbolAndUserId(String symbol, String userId);

    // Custom query to delete all stocks by userId
    void deleteByUserId(String userId);
}
