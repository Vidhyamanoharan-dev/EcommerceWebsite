package com.example.jewellery.controller;

import com.example.jewellery.dto.Auth.*;
import com.example.jewellery.model.Role; // Ensure Role is imported
import com.example.jewellery.model.User;
import com.example.jewellery.service.OtpService;
import com.example.jewellery.service.UserService;
import com.example.jewellery.config.JwtUtil;
import com.example.jewellery.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AuthenticationManager authManager;
    private final OtpService otpService;
    private final PasswordEncoder passwordEncoder;

    // ✅ Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Email already exists")
            );
        }
    
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
    
        Role role = Role.USER;
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            role = Role.ADMIN;
        }
        user.setRole(role);
    
        userRepository.save(user);
    
        return ResponseEntity.ok(
                Map.of("message", "User registered successfully")
        );
    }
    

    

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
    
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("User not found"));
    
            String token = jwtUtil.generateToken(user);
    
            // fetch role directly from the User entity
            String role = "ROLE_" + user.getRole().name(); // e.g., ROLE_ADMIN or ROLE_USER
    
            return ResponseEntity.ok(new AuthResponse(token, role));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }
    }
    


    // ✅ Send OTP (public)
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        try {
            otpService.generateAndSendOtp(request.getEmail());
            return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // ✅ Verify OTP and reset password (public)
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationRequest request) {
        try {
            boolean success = otpService.verifyOtpAndResetPassword(
                    request.getEmail(),
                    request.getOtp(),
                    request.getNewPassword()
            );

            if (success) {
                return ResponseEntity.ok(Map.of("message", "OTP verified and password updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", "Invalid OTP or expired"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
