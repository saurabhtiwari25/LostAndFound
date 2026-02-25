package com.my.lostfound.controller;

import com.my.lostfound.dto.LoginRequestDto;
import com.my.lostfound.dto.UserRequestDto;
import com.my.lostfound.dto.UserResponseDto;
import com.my.lostfound.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor // Automatically creates the constructor for the UserService
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    //  Register - Returns UserResponseDto directly
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRequestDto dto) {
        log.info("Registering user: {}", dto.getEmail());
        UserResponseDto response = userService.register(dto);
        return ResponseEntity.ok(response);
    }

    //  Login - Returns UserResponseDto directly
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        log.info("User login attempt: {}", dto.getEmail());
        UserResponseDto response = userService.login(dto);
        return ResponseEntity.ok(response);
    }

    //  Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable Long id) {
        log.info("Fetching user with id: {}", id);
        UserResponseDto response = userService.getUserById(id);
        return ResponseEntity.ok(response);
    }
}