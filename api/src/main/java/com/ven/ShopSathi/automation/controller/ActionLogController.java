package com.ven.ShopSathi.automation.controller;

import com.ven.ShopSathi.automation.entity.ActionLog;
import com.ven.ShopSathi.automation.repository.ActionLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actions")
@RequiredArgsConstructor
public class ActionLogController {

    private final ActionLogRepository actionLogRepository;

    @GetMapping
    public List<ActionLog> getActions() {
        return actionLogRepository.findAll();
    }
}
