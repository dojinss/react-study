package com.aloha.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.board.domain.Boards;
import com.aloha.board.domain.Files;

@Mapper
public interface FileMapper extends BaseMapper<Files>{
    // 부모값으로 삭제
    public int deleteByParentNo(Files file);
    // 부모값으로 목록 불러오기
    public List<Files> listByParent(Files file);
    // 선택 삭제 no
    public int deleteFiles(String noList);
    // 선택 삭제 id
    public int deleteFilesById(String idList);
    // 선택 삭제 noList
    public int deleteFileList(@Param("noList") List<Long> noList);
    // 선택 삭제 idList
    public int deleteFileListById(@Param("idList") List<String> idList);
    // 메인 이미지 정보 불러오기
    public Files selectMainFile(Boards board) throws Exception;
    // 타입별 파일 조회
    public List<Files> listByType(Files file) throws Exception;
}

