package com.hexaware.simplyfly.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hexaware.simplyfly.dto.UserDTO;
import com.hexaware.simplyfly.entity.User;
import com.hexaware.simplyfly.service.IUserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    @Autowired
    private IUserService service;

    @PostMapping("/add")
    public User addUser(@Valid @RequestBody UserDTO dto) {

        return service.addUser(dto);
    }

    @PutMapping("/update")
    public User updateUser(@Valid @RequestBody UserDTO dto) {

        return service.updateUser(dto);
    }

    @GetMapping("/getbyid/{userId}")
    public UserDTO getUserById(@PathVariable int userId) {

        return service.getUserById(userId);
    }

    @GetMapping("/getall")
    public List<User> getAllUsers() {

        return service.getAllUsers();
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUser(
            @PathVariable int userId) {

        service.deleteUser(userId);

        return new ResponseEntity<>(
                "User Deleted Successfully",
                HttpStatus.OK);
    }

}