package com.aloha.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.product.domain.Product;
import com.aloha.product.mapper.ProductMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> list() {
        return productMapper.list();
    }

    @Override
    public Product select(Long no){
        return productMapper.select(no);
    }

    @Override
    public Product selectById(String Id) {
        return productMapper.selectById(Id);
    }

    @Override
    public boolean insert(Product product) {
        log.info("상품 등록 중... Service");
        return productMapper.insert(product) > 0;
    }

    @Override
    public boolean update(Product product) {
        return productMapper.update(product) > 0;
    }

    @Override
    public boolean updateById(Product product) {
        return productMapper.updateById(product) > 0;
    }

    @Override
    public boolean delete(Long no) {
        return productMapper.delete(no) > 0;
    }
    
    @Override
    public boolean deleteById(String id) {
        return productMapper.deleteById(id) > 0;
    }

    @Override
    public boolean updateLike(String id, boolean check) {
        return productMapper.updateLike(id, check) > 0;
    }
    
}
