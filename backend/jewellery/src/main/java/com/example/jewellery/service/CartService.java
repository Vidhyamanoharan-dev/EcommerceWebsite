package com.example.jewellery.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.jewellery.model.Cart;
import com.example.jewellery.model.User;
import com.example.jewellery.model.Product;
import com.example.jewellery.repository.CartRepository;
import com.example.jewellery.repository.ProductRepository;
import com.example.jewellery.repository.UserRepository;


@Service
public class CartService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart addToCart(String email, Cart cartItem) {

        Product product = productRepository.findById(cartItem.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cartItem.setProductName(product.getName());
        cartItem.setPrice(product.getPrice());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartItem.setUser(user);

        return cartRepository.save(cartItem);
    }

    public List<Cart> getUserCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUser(user);
    }

    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartRepository.deleteAll(cartRepository.findByUser(user));
    }
}

