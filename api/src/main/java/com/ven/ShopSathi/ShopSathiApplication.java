package com.ven.ShopSathi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ShopSathiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopSathiApplication.class, args);
    }

}
