package com.example.jewellery.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class EncoderConfig {

    @Bean(name = "customPasswordEncoder")
    public BCryptPasswordEncoder myEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}