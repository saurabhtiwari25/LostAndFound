package com.my.lostfound.service;

import com.my.lostfound.dto.LoginRequestDto;
import com.my.lostfound.dto.UserRequestDto;
import com.my.lostfound.dto.UserResponseDto;

public interface UserService {

    UserResponseDto register(UserRequestDto dto);

    UserResponseDto login(LoginRequestDto dto);

    UserResponseDto getUserById(Long id);
}