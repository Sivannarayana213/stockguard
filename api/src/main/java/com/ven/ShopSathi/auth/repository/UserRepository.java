package com.ven.ShopSathi.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ven.ShopSathi.auth.entity.User;

public interface UserRepository extends JpaRepository <User, Long>  {
    Optional<User> findByEmail(String email);
}
