package com.hexaware.simplyfly.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hexaware.simplyfly.entity.User;
import com.hexaware.simplyfly.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository repo;

    @InjectMocks
    private UserServiceImpl service;

    @Test
    void testGetUserById() {

        User user = new User();
        user.setUserId(1);
        user.setName("Kalyaan");

        when(repo.findById(1))
                .thenReturn(Optional.of(user));

        assertNotNull(
                service.getUserById(1));
    }
}