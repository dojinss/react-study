package com.aloha.product.service;

import com.aloha.product.domain.Product;

public interface ProductService extends BaseService<Product>{
    public boolean updateLike(String id, boolean check );
}
