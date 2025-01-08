package com.aloha.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.board.domain.Boards;
import com.aloha.board.domain.Files;
import com.aloha.board.mapper.BoardMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService{

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private FileService fileService;

    @Override
    public List<Boards> list() {
        return boardMapper.list();
    }

    @Override
    public Boards select(Long no) {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String Id) {
        return boardMapper.selectById(Id);
    }

    @Override
    @Transactional
    public boolean insert(Boards board) {
        board.setId(UUID.randomUUID().toString());
        int result = boardMapper.insert(board);
        result += upload(board);
        return result > 0;
    }

    @Override
    public boolean update(Boards board) {
        int result = boardMapper.update(board);
        result += upload(board);
        return result > 0;
    }

    @Override
    public boolean updateById(Boards board) {
        log.info("수정 요청 받음");
        int result = boardMapper.updateById(board);
        Boards oldBoard = boardMapper.selectById(board.getId());
        board.setNo(oldBoard.getNo());
        result += upload(board);
        return result > 0;
    }

    @Override
    public boolean delete(Long no) {
        Files file = Files.builder().pNo(no).pTable("boards").build();
        int deleteResult = fileService.deleteByParentNo(file);
        log.info(deleteResult + "건의 파일이 삭제 되었습니다.");
        return boardMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) {
        Boards boardInfo = boardMapper.selectById(id);
        Files file = Files.builder().pNo(boardInfo.getNo()).pTable("boards").build();
        int deleteResult = fileService.deleteByParentNo(file);
        log.info(deleteResult + "건의 파일이 삭제 되었습니다.");
        return boardMapper.deleteById(id) > 0;
    }

    @Override
    public PageInfo<Boards> list(int page, int sizboard) {
        PageHelper.startPage(page, sizboard);
        List<Boards> list = boardMapper.list();
        PageInfo<Boards> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }
    
    public int upload(Boards board) {
        log.info("업로드 요청중...");

        int result = 0;
        String pTable = "boards";
        Long pNo = board.getNo();
        
        List<Files> uploadFileList = new ArrayList<>();
        List<MultipartFile> files = board.getFileList();
        MultipartFile mainFile = board.getMainFile();
        Files existFile = null;
        try {
            existFile = fileService.selectMainFile(board);
            log.info("기존 메인 파일 정보 불러오기");
            log.info("기존 메인 파일 정보 : " + existFile);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (mainFile != null && !mainFile.isEmpty() && existFile == null) {
            log.info("MAIN 파일 추가.");
            Files mainFileInfo = new Files();
            mainFileInfo.setType("MAIN");
            mainFileInfo.setPNo(pNo);
            mainFileInfo.setPTable(pTable);
            mainFileInfo.setUploadFile(mainFile);
            uploadFileList.add(mainFileInfo);
        }

        if (files != null && !files.isEmpty()) {
            for (MultipartFile multipartFile : files) {
                if (multipartFile.isEmpty()) {
                    continue;
                }
                log.info("SUB 파일 추가.");
                Files fileInfo = new Files();
                fileInfo.setPNo(pNo);
                fileInfo.setPTable(pTable);
                fileInfo.setUploadFile(multipartFile);
                fileInfo.setType("SUB");
                uploadFileList.add(fileInfo);
            }
        }


        try {
            result += fileService.upload(uploadFileList);
        } catch (Exception e) {
            log.error("파일 등록중에 에러...", e);
        }

        return result;
    }
}
