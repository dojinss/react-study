package com.aloha.board.mapper;

import java.util.List;

public interface BaseMapper<E> {

    public List<E> list();

    public E select(Long no);
    public E selectById(String Id);
    
    public int insert(E e);

    public int update(E e);
    public int updateById(E e);

    public int delete(Long no);
    public int deleteById(String id);
}
