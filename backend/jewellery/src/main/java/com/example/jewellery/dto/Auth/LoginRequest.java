package com.example.jewellery.dto.Auth;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
