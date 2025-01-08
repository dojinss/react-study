package com.aloha.board.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.board.domain.Files;
import com.aloha.board.service.FileService;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/files")
public class FileController {

  @Autowired
  private FileService fileService;

  @Autowired
  ResourceLoader resourceLoader;

  @GetMapping()
  public ResponseEntity<?> getAll() {
    try {
      List<Files> fileList = fileService.list();
      return new ResponseEntity<>(fileList, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getOne(@PathVariable("id") String id) {
    try {
      Files files = fileService.selectById(id);
      return new ResponseEntity<>(files, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping()
  public ResponseEntity<?> create(@RequestBody Files files) {
    try {
      if (fileService.insert(files)) {
        return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);
      } else {
        return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping()
  public ResponseEntity<?> update(@RequestBody Files files) {
    try {
      if (fileService.update(files)) {
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
      } else {
        return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> destroy(@PathVariable("id") String id) {
    try {
      if (fileService.deleteById(id)) {
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
      } else {
        return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 파일 선택 삭제
   * @param idList : { "noList" : [1,2,3...]}
   * @param noList : { "idList" : ['id1','id2'...]}
   * @return
   */
  @DeleteMapping("")
  public ResponseEntity<?> deleteSelected(
    @RequestParam(value = "noList",required = false) List<Long> noList,
    @RequestParam(value = "idList",required = false) List<String> idList
  ){
    log.info("noList[] : " + noList);
    log.info("idList[] : " + idList);
    try {
      boolean deleted = false;
      if (noList != null) {
        log.info("번호목록으로 삭제");
        deleted = fileService.deleteFiles(noList);
      }
      if (idList != null) {
        log.info("아이디목록으로 삭제");
        deleted = fileService.deleteFilesById(idList);
      }
      if (deleted) {
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
      } else {
        return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
      }
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 파일 다운로드
   * 
   * @param id
   * @param response
   */
  @GetMapping("/download/{id}")
  public void fileDownload(
      @PathVariable("id") String id,
      HttpServletResponse response) throws Exception {
    log.info("다운로드 경로 진입...");
    fileService.download(id, response);
  }

  /*
   * 썸네일 이미지 파일 불러오기
   */
  @GetMapping({"/img/{id}","/img/"})
  public void thumbnailImg(
    @PathVariable(value = "id",required = false) String id,
    HttpServletResponse response
  ) throws IOException {
    Resource resource = resourceLoader.getResource("classpath:static/img/no-image.png");

    Files file = null;
    if (id != null) {
      file = fileService.selectById(id);
    }
    String ext = "";
    File imgFile = null;
    if (file != null) {

      String filePath = file.getFilePath();
      
      if (filePath == null) {
        // no-image 세팅
        imgFile = resource.getFile();
        filePath = imgFile.getPath();
      }
      else {
        imgFile = new File(filePath);
        if(!imgFile.exists()){
          // no-image 세팅
          imgFile = resource.getFile();
          filePath = imgFile.getPath();
        }
      }
      ext = filePath.substring(filePath.lastIndexOf(".") + 1);        
    }
    else {
      ext = "png";
      imgFile = resource.getFile();
    }

    String mimeType = MimeTypeUtils.parseMimeType("image/" + ext).toString();
    MediaType mediaType = MediaType.valueOf(mimeType);

    response.setContentType(mediaType.toString());

    FileInputStream fis = new FileInputStream(imgFile);
    ServletOutputStream sos = response.getOutputStream();
    FileCopyUtils.copy(fis, sos);

    fis.close();
    sos.close();
  }

}
