package com.ven.ShopSathi.ads.entity;

import com.ven.ShopSathi.common.enums.CampaignStatus;
import com.ven.ShopSathi.inventory.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link Campaign → Product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String platform; // META or GOOGLE

    @Column(nullable = false)
    private String campaignId; // Meta campaign ID
    
    @Enumerated(EnumType.STRING)
    private CampaignStatus status; // ACTIVE / PAUSE
}

