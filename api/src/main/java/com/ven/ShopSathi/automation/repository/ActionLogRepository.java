package com.ven.ShopSathi.automation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ven.ShopSathi.automation.entity.ActionLog;

public interface ActionLogRepository  extends JpaRepository<ActionLog, Long> {
}
