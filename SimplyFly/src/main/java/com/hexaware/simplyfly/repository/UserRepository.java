package com.hexaware.simplyfly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.simplyfly.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findByEmail(String email);

}