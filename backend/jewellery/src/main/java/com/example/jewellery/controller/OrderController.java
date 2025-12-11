package com.example.jewellery.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")   // VERY IMPORTANT
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @PostMapping
    public Map<String, Object> placeOrder(@RequestBody Map<String, Object> orderData) {

        System.out.println("Order received: " + orderData);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Order placed successfully");

        return response;
    }

    @GetMapping
    public List<Map<String, Object>> getOrders() {
        return List.of(); // empty list for now
    }
}
