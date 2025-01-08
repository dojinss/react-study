-- Active: 1731383995662@@127.0.0.1@3306@aloha
DROP TABLE IF EXISTS `boards`;

CREATE TABLE `boards` (
    `no` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
    `id` VARCHAR(64) NOT NULL COMMENT 'UK',
    `title` VARCHAR(100) NOT NULL COMMENT '제목',
    `writer` VARCHAR(100) NOT NULL COMMENT '작성자',
    `content` TEXT NULL COMMENT '내용',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일자'
);

TRUNCATE TABLE `boards`;

INSERT INTO boards(id,`title`,`writer`,`content`)
VALUES(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1'),
(UUID(),'제목1','작성자1','내용1');
