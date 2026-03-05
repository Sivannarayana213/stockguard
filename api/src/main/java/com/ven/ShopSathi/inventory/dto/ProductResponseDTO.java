package com.ven.ShopSathi.inventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String sku;
    private Integer stock; 
}
