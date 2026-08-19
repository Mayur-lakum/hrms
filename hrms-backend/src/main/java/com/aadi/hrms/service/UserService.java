package com.aadi.hrms.service;

import com.aadi.hrms.dto.LoginRequestDto;
import com.aadi.hrms.dto.LoginResponseDto;
import com.aadi.hrms.dto.UserRequestDto;
import com.aadi.hrms.dto.UserResponseDto;
import com.aadi.hrms.entity.User;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

public interface UserService {



    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    void deleteUser(Long id);

    UserResponseDto registerUser(UserRequestDto request);

    LoginResponseDto login(LoginRequestDto request);
}

