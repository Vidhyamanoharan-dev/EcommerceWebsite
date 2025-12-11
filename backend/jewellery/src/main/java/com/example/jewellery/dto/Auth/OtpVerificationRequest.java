package com.example.jewellery.dto.Auth;

import lombok.Data;

@Data
public class OtpVerificationRequest {
    private String email;
    private String otp;
    private String newPassword;
}
