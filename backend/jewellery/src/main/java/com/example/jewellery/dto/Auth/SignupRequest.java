package com.example.jewellery.dto.Auth;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Optional: "USER" or "ADMIN"
    private String role; // Make sure this is declared correctly, not inside a method
}
