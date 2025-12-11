package com.example.jewellery.service;

import com.example.jewellery.model.User;
import com.example.jewellery.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final JavaMailSender mailSender;
    private final UserService userService;

    private static class OtpDetails {
        String otp;
        Instant expiresAt;

        OtpDetails(String otp, Instant expiresAt) {
            this.otp = otp;
            this.expiresAt = expiresAt;
        }
    }

    private final Map<String, OtpDetails> otpStorage = new ConcurrentHashMap<>();

    // 🔹 Generate OTP and send email
    public void generateAndSendOtp(String email) throws Exception {
        // Throws exception if user not found
        userService.getUserByEmail(email);

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        Instant expiry = Instant.now().plusSeconds(600); // 10 min

        otpStorage.put(email, new OtpDetails(otp, expiry));

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp + " (valid for 10 minutes)");
        mailSender.send(message);
    }

    // 🔹 Verify OTP and reset password
    public boolean verifyOtpAndResetPassword(String email, String otp, String newPassword) {
        OtpDetails otpDetails = otpStorage.get(email);

        if (otpDetails == null || Instant.now().isAfter(otpDetails.expiresAt) || !otpDetails.otp.equals(otp)) {
            return false;
        }

        // OTP valid → update password
        userService.updatePassword(email, newPassword);
        otpStorage.remove(email);
        return true;
    }
}
