package com.aloha.product.domain;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Product {
    
    private Long no;
    private String id;
    private String title;
    private String content;
    private Long likes;
    private String img;
    private Date createdAt;
    private Date updatedAt;

    public Product() {
        this.id = UUID.randomUUID().toString();
    }
}
