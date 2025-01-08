package com.aloha.product.service;

import java.util.List;

public interface BaseService<E> {
    
    public List<E> list();

    public E select(Long no);
    public E selectById(String Id);
    
    public boolean insert(E e);

    public boolean update(E e);
    public boolean updateById(E e);

    public boolean delete(Long no);
    public boolean deleteById(String id);

}
