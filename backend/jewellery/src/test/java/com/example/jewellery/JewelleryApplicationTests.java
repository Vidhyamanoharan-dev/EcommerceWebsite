package com.example.jewellery;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(properties = "jwt.secret=QctibIuAwy5Dl/2hZjCoB1Xc3Dm9XHVsQQjDybHTsZY=")@TestPropertySource(properties = {
    "spring.main.allow-bean-definition-overriding=true",
    "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration"
})
public class JewelleryApplicationTests {
    @Test
    void contextLoads() {}
}
