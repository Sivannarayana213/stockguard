package com.ven.ShopSathi.inventory.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotBlank(message = "Product name cannot be empty")
    private String name;

    @NotBlank(message = "SKU cannot be empty")
    private String sku;

    @NotBlank(message = "Stock cannot be null")
    @Min(value = 0, message = "Stock cannot be negative" )
    private Integer stock;
}
