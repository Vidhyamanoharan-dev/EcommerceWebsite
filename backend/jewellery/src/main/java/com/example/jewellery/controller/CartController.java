package com.example.jewellery.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.jewellery.model.Cart;
import com.example.jewellery.service.CartService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cartItem, Principal principal) {
        return ResponseEntity.ok(cartService.addToCart(principal.getName(), cartItem));
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getUserCart(Principal principal) {
        return ResponseEntity.ok(cartService.getUserCart(principal.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return ResponseEntity.ok("Item removed from cart");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Principal principal) {
        cartService.clearCart(principal.getName());
        return ResponseEntity.ok("Cart cleared");
    }
}
