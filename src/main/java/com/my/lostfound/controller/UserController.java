package com.my.lostfound.controller;

import com.my.lostfound.dto.LoginRequestDto;
import com.my.lostfound.dto.UserRequestDto;
import com.my.lostfound.dto.UserResponseDto;
import com.my.lostfound.payload.ApiResponse;
import com.my.lostfound.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDto>> register(@Valid @RequestBody UserRequestDto dto) {
        UserResponseDto response = userService.register(dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponseDto>> login(@Valid @RequestBody LoginRequestDto dto) {
        UserResponseDto response = userService.login(dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponseDto>> getUser(@PathVariable Long id) {
        UserResponseDto response = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "User found", response));
    }
}