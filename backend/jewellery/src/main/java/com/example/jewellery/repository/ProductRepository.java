package com.example.jewellery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.jewellery.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category);

}
