package com.example.jewellery.service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.jewellery.repository.ProductRepository; // Ensure this matches the actual package of ProductRepository
import com.example.jewellery.model.Product; // Ensure this matches the actual package of Product

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class ProductImageSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;  // make sure this matches your actual repository

    @Override
    public void run(String... args) {
        List<String> dummyImages = Arrays.asList(
            "https://picsum.photos/300?random=101",
            "https://picsum.photos/300?random=102",
            "https://picsum.photos/300?random=103",
            "https://picsum.photos/300?random=104",
            "https://picsum.photos/300?random=105"
        );

        List<Product> products = productRepository.findAll();
        Random random = new Random();

        for (Product product : products) {
            int randomIndex = random.nextInt(dummyImages.size());
            product.setImageUrl(dummyImages.get(randomIndex)); // Make sure `setImageUrl()` exists
        }

        productRepository.saveAll(products);
        System.out.println("✅ Dummy images added to existing products.");
    }
}
