package com.example.jewellery.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import com.example.jewellery.model.User; // Adjust the package path to the actual location of the User class

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "QctibIuAwy5Dl/2hZjCoB1Xc3Dm9XHVsQQjDybHTsZY=";
    private final long EXPIRATION = 86400000; // 1 day
    private final String jwtSecret = SECRET;
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", "ROLE_" + user.getRole().name()) // Use DB role
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }
    

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
