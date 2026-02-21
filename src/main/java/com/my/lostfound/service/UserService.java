package com.my.lostfound.service;

import com.my.lostfound.dto.LoginRequestDto;
import com.my.lostfound.dto.UserRequestDto;
import com.my.lostfound.dto.UserResponseDto;

public interface UserService {

    // Returns DTO instead of String
    UserResponseDto register(UserRequestDto dto);

    // Returns DTO instead of String
    UserResponseDto login(LoginRequestDto dto);

    // Added to match the implementation in UserServiceImpl
    UserResponseDto getUserById(Long id);
}