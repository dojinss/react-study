package com.aloha.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.todo.domain.Todos;
import com.aloha.todo.mapper.TodoMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoMapper todoMapper;

    @Override
    public List<Todos> list() {
        return todoMapper.list();
    }

    @Override
    public Todos select(Long no) {
        return todoMapper.select(no);
    }

    @Override
    public Todos selectById(String Id) {
        return todoMapper.selectById(Id);
    }

    @Override
    public boolean insert(Todos todos) {
        return todoMapper.insert(todos) > 0;
    }

    @Override
    public boolean update(Todos todos) {
        return todoMapper.update(todos) > 0;
    }
    
    @Override
    public boolean updateById(Todos todos) {
        return todoMapper.updateById(todos) > 0;
    }
    
    @Override
    public boolean delete(Long no) {
        return todoMapper.delete(no) > 0;
    }
    
    @Override
    public boolean deleteById(String id) {
        return todoMapper.deleteById(id) > 0;
    }

    @Override
    public PageInfo<Todos> list(int page, int size) {
        PageHelper.startPage(page, size);
        List<Todos> list = todoMapper.list();
        PageInfo<Todos> pageInfo = new PageInfo<>(list);
        pageInfo.getList().sort((t1,t2) -> {
            int statusCompare = t1.getStatus().compareTo(t2.getStatus());
            if ( statusCompare != 0 ) {
                return statusCompare;
            }
            return t1.getSeq().compareTo(t2.getSeq());
        });
        return pageInfo;
    }

    @Override
    public boolean allDelete() {
        return todoMapper.allDelete() > 0;
    }

    @Override
    public boolean allDone() {
        return todoMapper.allDone() > 0;
    }

}
