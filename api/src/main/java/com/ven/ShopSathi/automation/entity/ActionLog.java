package com.ven.ShopSathi.automation.entity;

import java.time.LocalDateTime;

import com.ven.ShopSathi.ads.entity.Campaign;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name =  "action_logs")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor

public class ActionLog {

@Id
@GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    
    //Campaign affected
    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    private String actionType; //pause

    private Double saveAmount;

    private LocalDateTime timestamp;
    
}
