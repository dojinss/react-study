package com.aloha.board.service;

import java.util.List;

import com.aloha.board.domain.Boards;
import com.aloha.board.domain.Files;

import jakarta.servlet.http.HttpServletResponse;

public interface FileService extends BaseService<Files>{
    // 부모값으로 삭제
    public int deleteByParentNo(Files file);
    // 부모값으로 목록 불러오기
    public List<Files> listByParent(Files file);
    // 선택 삭제 no
    public boolean deleteFiles(List<Long> noList);
    // 선택 삭제 id
    public boolean deleteFilesById(List<String> idList);

    // 업로드
    public int upload(Files file) throws Exception;
    // 다중 업로드
    public int upload(List<Files> fileList) throws Exception;
    // 파일 다운로드
    public int download(String id, HttpServletResponse response) throws Exception;

    // 메인 이미지 정보 불러오기
    public Files selectMainFile(Boards board) throws Exception;
    // 타입별 파일 조회
    public List<Files> listByType(Files file) throws Exception;
    
}
