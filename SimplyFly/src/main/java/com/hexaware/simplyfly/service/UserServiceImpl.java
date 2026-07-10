package com.hexaware.simplyfly.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.simplyfly.dto.UserDTO;
import com.hexaware.simplyfly.entity.User;
import com.hexaware.simplyfly.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(UserDTO dto) {

        log.info("Adding User : {}", dto.getName());

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        user.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()));

        user.setPhone(dto.getPhone());
        user.setGender(dto.getGender());
        user.setRole(dto.getRole());

        User savedUser = repo.save(user);

        log.info(
                "User Added Successfully with ID : {}",
                savedUser.getUserId());

        return savedUser;
    }

    @Override
    public User updateUser(UserDTO dto) {

        log.info("Updating User : {}", dto.getUserId());

        User existingUser =
                repo.findById(dto.getUserId())
                .orElse(null);

        if (existingUser == null) {

            log.error(
                    "User Not Found : {}",
                    dto.getUserId());

            return null;
        }

        existingUser.setName(dto.getName());
        existingUser.setEmail(dto.getEmail());

        existingUser.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()));

        existingUser.setPhone(dto.getPhone());
        existingUser.setGender(dto.getGender());
        existingUser.setRole(dto.getRole());

        User updatedUser =
                repo.save(existingUser);

        log.info(
                "User Updated Successfully : {}",
                updatedUser.getUserId());

        return updatedUser;
    }

    @Override
    public UserDTO getUserById(int userId) {

        log.info(
                "Fetching User By ID : {}",
                userId);

        User user =
                repo.findById(userId)
                .orElse(null);

        if (user == null) {

            log.error(
                    "User Not Found : {}",
                    userId);

            return null;
        }

        UserDTO dto = new UserDTO();

        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setPhone(user.getPhone());
        dto.setGender(user.getGender());
        dto.setRole(user.getRole());

        log.info(
                "User Found : {}",
                userId);

        return dto;
    }

    @Override
    public List<User> getAllUsers() {

        log.info("Fetching All Users");

        return repo.findAll();
    }

    @Override
    public void deleteUser(int userId) {

        log.warn(
                "Deleting User : {}",
                userId);

        repo.deleteById(userId);

        log.warn(
                "User Deleted : {}",
                userId);
    }
}