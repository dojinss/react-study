-- Active: 1731383995662@@127.0.0.1@3306@aloha
DROP TABLE IF EXISTS `products`;

TRUNCATE Table products;

CREATE TABLE `products` (
	`no`	        BIGINT          PRIMARY KEY AUTO_INCREMENT	            NOT NULL	COMMENT 'PK',
	`id`	        VARCHAR(64)	    NOT NULL	COMMENT 'UK',
	`title`	        VARCHAR(100)	NOT NULL	COMMENT '상품명',
	`content`	    TEXT	        NULL	    COMMENT '설명',
	`likes`	        BIGINT	        NULL	    DEFAULT 0	                COMMENT '좋아요',
	`img`	        TEXT	        NULL	    COMMENT '이미지경로',
	`created_at`	TIMESTAMP	    NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '등록일자',
	`updated_at`	TIMESTAMP	    NOT NULL	DEFAULT CURRENT_TIMESTAMP	COMMENT '수정일자'
);

INSERT INTO products(id, title, content, img)
VALUES(UUID() , "김치찌개", "맛있는 김치찌개", "https://oasisprodproduct.edge.naverncp.com/23330/detail/detail_23330_0_9b9a09ff-0c73-4cd1-8d1e-f05aab062151.jpg"),
(UUID() , "스팸", "흰밥위에 스팸한조각", "https://img4.daumcdn.net/thumb/R658x0.q70/?fname=http://t1.daumcdn.net/news/201510/12/chosun/20151012100142852dcoe.jpg"),
(UUID() , "계란후라이", "반숙이 진리지", "https://cdn.huffingtonpost.kr/news/photo/202110/114008_218464.jpeg");




