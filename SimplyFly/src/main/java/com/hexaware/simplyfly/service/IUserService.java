package com.hexaware.simplyfly.service;

import java.util.List;

import com.hexaware.simplyfly.dto.UserDTO;
import com.hexaware.simplyfly.entity.User;

public interface IUserService {

    User addUser(UserDTO dto);

    User updateUser(UserDTO dto);

    UserDTO getUserById(int userId);

    List<User> getAllUsers();

    void deleteUser(int userId);

}