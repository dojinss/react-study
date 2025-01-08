package com.aloha.board.service;

import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.board.domain.Boards;
import com.aloha.board.domain.Files;
import com.aloha.board.mapper.FileMapper;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public List<Files> list() {
        return fileMapper.list();
    }

    @Override
    public Files select(Long no) {
        return fileMapper.select(no);
    }

    @Override
    public Files selectById(String id) {
        return fileMapper.selectById(id);
    }

    @Override
    public boolean insert(Files e) {
        return fileMapper.insert(e) > 0;
    }

    @Override
    public boolean update(Files e) {
        log.info("수정중...");
        return fileMapper.update(e) > 0;
    }

    @Override
    public boolean updateById(Files e) {
        return fileMapper.updateById(e) > 0;
    }

    @Override
    public boolean delete(Long no) {
        Files file = fileMapper.select(no);

        delete(file);

        return fileMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) {
        Files file = fileMapper.selectById(id);
        delete(file);
        return fileMapper.deleteById(id) > 0;
    }

    @Override
    public int deleteByParentNo(Files file) {
        List<Files> fileList = fileMapper.listByParent(file);
        
        for (Files files : fileList) {
            // 파일 삭제
            delete(files);
        }

        // DB 데이터 삭제
        return fileMapper.deleteByParentNo(file);
    }

    /**
     * 파일시스템에서 삭제
     * @param file
     * @return
     */
    public boolean delete(Files file) {
        if( file == null ) return false;

        String filePath = file.getFilePath();
        File deleteFile = new File(filePath);

        if (!deleteFile.exists()) {
            log.error("파일이 존재 하지 않습니다.");
        }

        boolean deleted = deleteFile.delete();
        if (deleted) {
            log.info("파일이 삭제 되었습니다.");
            log.info("- " + filePath);
        }
        return deleted;
    }

    @Override
    public List<Files> listByParent(Files file) {
        return fileMapper.listByParent(file);
    }
    

    @Override
    public int upload(Files file) throws Exception {
        int result = 0;
        MultipartFile multipartFile = file.getUploadFile();
        // 파일 존재여부 판단
        if (multipartFile.isEmpty()) {
            return result;
        }
        // 업로드 폴더 유무 체크
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        log.info("파일 업로드 요청");
        // FS 에 등록
        String originName = multipartFile.getOriginalFilename();
        Long fileSize = multipartFile.getSize();
        byte[] fileData = multipartFile.getBytes();
        String fileName = UUID.randomUUID().toString() + "_" + originName;
        String filePath = uploadPath + "/" + fileName;
        File uploadFile = new File(filePath);
        FileCopyUtils.copy(fileData, uploadFile); // 파일 업로드

        // DB 에 등록
        file.setFileSize(fileSize);
        file.setOriginName(originName);
        file.setFilePath(filePath);
        file.setFileName(fileName);
        result = fileMapper.insert(file);

        return result;
    }

    @Override
    public int upload(List<Files> fileList) throws Exception {
        int result = 0;
        if(fileList == null || fileList.isEmpty()){
            return result;
        }

        for (Files files : fileList) {
            result += upload(files);
        }
        return result;
    }

    @Override
    public int download(String id, HttpServletResponse response) throws Exception {
        int result = 0;
        log.info("다운로드 요청중...");
        Files file = fileMapper.selectById(id);
        
        if (file == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return result;
        }
        // 파일 정보 입력
        String fileName = URLEncoder.encode(file.getOriginName(),"UTF-8");
        
        String filePath = file.getFilePath();
        File downloadFile = new File(filePath);
        FileInputStream fis = new FileInputStream(downloadFile);

        
        // 파일 다운로드 응답 해더 세팅
        // - Content-Type           : application/octet-stream
        // - Content-Disposition    : attachment; filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
        
        // 파일 출력
        ServletOutputStream sos = response.getOutputStream();

        // 다운로드
        result = FileCopyUtils.copy(fis, sos);
        fis.close();
        sos.close();

        return result;
    }

    @Override
    public boolean deleteFiles(List<Long> noList) {
        if( noList == null ) return false;

        // 업로드된 파일 삭제
        for (Long no : noList) {
            Files file = select(no);
            delete(file);
        }

        // DB 에서 정보 삭제
        return fileMapper.deleteFileList(noList) > 0;
    }
    
    @Override
    public boolean deleteFilesById(List<String> idList) {
        if( idList == null ) return false;
        
        // 업로드된 파일 삭제
        for (String id : idList) {
            Files file = selectById(id);
            delete(file);
        }

        // DB 에서 정보 삭제
        return fileMapper.deleteFileListById(idList) > 0;
    }

    @Override
    public Files selectMainFile(Boards board) throws Exception {
        return fileMapper.selectMainFile(board);
    }

    @Override
    public List<Files> listByType(Files file) throws Exception {
        return fileMapper.listByType(file);
    }

}
