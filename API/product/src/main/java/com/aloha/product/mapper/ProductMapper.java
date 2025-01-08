package com.aloha.product.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.product.domain.Product;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {
    public int updateLike(@Param("id") String id
                         ,@Param("check") boolean check );
}
