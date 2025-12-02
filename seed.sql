-- Seed data generated for MySQL (UTF8MB4) with static asset URLs
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS semester_comments;
DROP TABLE IF EXISTS semesters;
DROP TABLE IF EXISTS post_comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255),
  email VARCHAR(255),
  user_id VARCHAR(255),
  password VARCHAR(255),
  state INT,
  create_at DATETIME,
  photo_id INT,
  message TEXT,
  profile_photo TEXT,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_user_id (user_id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sessions (
  id INT NOT NULL AUTO_INCREMENT,
  session_id BIGINT,
  user_id INT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT,
  article LONGTEXT,
  create_at DATETIME,
  user_id INT,
  src_json LONGTEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_comments (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  username VARCHAR(255),
  post_id INT,
  article TEXT,
  create_at DATETIME,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE semesters (
  id INT NOT NULL AUTO_INCREMENT,
  title TEXT,
  article LONGTEXT,
  create_at DATETIME,
  user_id INT,
  username VARCHAR(255),
  photo_id INT,
  src_json LONGTEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE semester_comments (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  username VARCHAR(255),
  semester_id INT,
  article TEXT,
  create_at DATETIME,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE members (
  id INT NOT NULL AUTO_INCREMENT,
  article TEXT,
  user_id INT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE photos (
  id INT NOT NULL AUTO_INCREMENT,
  src TEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (id, username, email, user_id, password, state, create_at, photo_id, message, profile_photo) VALUES
  (1, '박설호', 'root@example.com', 'root', '$2b$10$zdRgRo8Ydm.1R2j1xnqhwur6270gwL8bYm51p3RV2Jqyx/7YjRZpS', 777, '2025-05-07 19:17:39', 1, '안녕하세요 박설호입니다. ', NULL),
  (2, '김지성', 'root1@example.com', 'root1', '$2b$10$zdRgRo8Ydm.1R2j1xnqhwur6270gwL8bYm51p3RV2Jqyx/7YjRZpS', 777, '2025-05-07 19:17:39', 7, '안녕하세요 김지원입니다.', NULL),
  (3, '오예찬', 'root2@example.com', 'root2', '$2b$10$zdRgRo8Ydm.1R2j1xnqhwur6270gwL8bYm51p3RV2Jqyx/7YjRZpS', 777, '2025-05-07 19:17:39', 5, '안녕하세요 관리자 김예찬입니다.', NULL),
  (4, '조건하', 'root3@example.com', 'root3', '$2b$10$zdRgRo8Ydm.1R2j1xnqhwur6270gwL8bYm51p3RV2Jqyx/7YjRZpS', 777, '2025-05-07 19:17:39', 4, '', NULL),
  (5, '안태현', 'root4@example.com', 'root4', '$2b$10$zdRgRo8Ydm.1R2j1xnqhwur6270gwL8bYm51p3RV2Jqyx/7YjRZpS', 777, '2025-05-07 19:17:39', 3, '', NULL),
  (7, '이세현', 'bobomaru@example.com', 'bobomaru', '$2b$10$jBdUJzSeFQpn62FJyfA3COdE.D14mGghG0H7a.WRadWYB.WWHu1mC', 1, '2025-06-21 20:09:24', 10, '', ''),
INSERT INTO sessions (id, session_id, user_id) VALUES
  (1, 1, 1),
  (2, 1750513357613, 1),
  (3, 1763902278981, 3),
  (4, 1764081238078, 3);

INSERT INTO posts (id, title, article, create_at, user_id, src_json) VALUES
  (1, '안녕하세요 게시판을 이용해주셔서 감사합니다.', '첫번째 게시글입니다. 

자유롭게 게시글을 작성해보세요 

', '2025-06-21 16:58:52', 1, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "첫번째 게시글입니다. "}]}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "자유롭게 게시글을 작성해보세요 "}]}]}'),
  (2, '두번째 글 작성입니다.', '각자 회원가입 후 게시글을 작성해보세요 !



귀요미 태형이를 봐주세요', '2025-06-21 17:28:42', 1, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "각자 회원가입 후 게시글을 작성해보세요 !"}]}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "귀요미 태형이를 봐주세요"}]}]}'),
  (3, '안녕하세요 ', '오예찬입니더. 잘 지내봅시더



카고 까불지 마이소', '2025-06-21 20:29:26', 3, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "오예찬입니더. 잘 지내봅시더"}]}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "카고 까불지 마이소"}]}]}'),
  (4, '수고하셨습니다.', '한달 조금 넘는 시간동안 다들 열심히 따라와주시고 진지하게 임해주셔서 감사합니다.', '2025-06-21 21:08:54', 1, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "한달 조금 넘는 시간동안 다들 열심히 따라와주시고 진지하게 임해주셔서 감사합니다."}]}]}');

INSERT INTO post_comments (id, user_id, username, post_id, article, create_at) VALUES
  (1, 1, '박설호', '1', '댓글도 많이 많이 달아주세요~', '2025-06-21 16:59:40'),
  (2, 3, '오예찬', '1', '안녕하세요', '2025-06-21 17:27:02'),
  (3, 7, '이세현', '1', '차은우인가요?', '2025-06-21 20:12:21'),
  (4, 1, '박설호', '2', '자알 생깃네요', '2025-06-21 22:07:42'),
  (6, 5, '안태형', '4', '수고하셨습니다.', '2025-06-21 22:13:07'),
  (7, 5, '안태형', '3', '굿굿', '2025-06-21 22:13:22');

INSERT INTO semesters (id, title, article, create_at, user_id, username, photo_id, src_json) VALUES
  (1, ' 출국 관련 공지사항', '출국 절차





준비물 정보





입국 심사 등록





', '2025-06-21 19:50:54', 2, '김지성', 8, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "출국 절차"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "준비물 정보"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "입국 심사 등록"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}]}'),
  (2, ' 숙소 정보 공지', '



숙소 정보 , 위치 







숙소 주변 시설



', '2025-06-21 20:22:48', 1, '박설호', 11, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "숙소 정보 , 위치 "}]}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "숙소 주변 시설"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}]}'),
  (3, '어학원과 강의 정보 공지', '



오사카외어학원 







일본어 강의진







일본어 교재 정보



', '2025-06-21 20:24:15', 1, '박설호', 12, '{"type": "doc", "content": [{"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "오사카외어학원 "}]}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "일본어 강의진"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}}, {"type": "paragraph", "attrs": {"textAlign": null}, "content": [{"type": "text", "text": "일본어 교재 정보"}]}, {"type": "paragraph", "attrs": {"textAlign": null}}]}');

INSERT INTO semester_comments (id, user_id, username, semester_id, article, create_at) VALUES
  (1, 3, '오예찬', 3, '공지해주셔서 감사합니다.', '2025-06-21 20:26:40'),
  (2, 1, '박설호', 2, '공지글 감사합니다
', '2025-06-21 22:08:13'),
  (3, 1, '박설호', 1, '공지글 감사합니다
', '2025-06-21 22:08:23'),
  (4, 1, '박설호', 3, '공지해주셔서 감사합니다.', '2025-06-21 22:08:40'),
  (5, 5, '안태형', 2, '공지감사합니다.', '2025-06-21 22:12:23'),
  (6, 5, '안태형', 1, '공지글 감사합니다.
', '2025-06-21 22:12:43'),
  (7, 5, '안태형', 3, '공지 감사합니다~~', '2025-06-21 22:13:48');

INSERT INTO members (id, article, user_id) VALUES
  (1, '팀원들과 함께 프론트엔드 개발을 해본 것은 이번이 처음이었습니다.
함께 개발하면서 재사용성이 높은 컴포넌트와 효율적인 폴더 구조에 대해 깊이 고민해볼 수 있는 좋은 시간이었습니다.
끝까지 열심히 함께해준 팀원들에게 진심으로 감사드립니다.', 1),
  (2, '이 프로젝트는 단순한 웹사이트 개발을 넘어, 협업과 경험을 통해 문제 해결 능력을 키울 수 있는 소중한 기회였습니다. 개발 과정에서의 어려웠던 점은 이번 경험을 통해 이후에는 나의 강점으로 성장할 수 있다고 생각합니다. 팀원들 모두 고생 많았습니다.', 2),
  (3, '함께 고민하고 해결해 나가면서, 팀이라는 존재의 가치를 배웠습니다.
혼자였다면 절대 끝낼 수 없었던 이 프로젝트를 통해 협업의 힘을 깊이 느꼈고, 팀원 간의 신뢰와 배려가 최고의 결과를 만든다는 것을 알게 되었습니다. 
모두 수고했습니다!', 3),
  (4, '처음엔 각자 실력 차이도 있었고, 의견을 모으는 게 쉽지 않았지만, 함께 부딪히고 맞춰가는 과정 속에서 진짜 팀워크를 배웠습니다. 나 혼자만 이해해서는 부족했고, 서로 설명하고 도우면서 오히려 더 깊이 이해할 수 있었던 것 같아요. 무엇보다, 함께 성장하려는 이 팀의 분위기가 정말 좋았습니다.', 4),
  (5, '조별 프로젝트를 진행하며, 단순히 이해하는 것에 그치지 않고 타인에게 설명할 수 있어야 진정한 나의 지식이 된다는 사실을 깨달았습니다. 팀원 모두가 이해하고 따라올 수 있도록 서로 도우며 함께 성장할 수 있었고, 이 과정이 큰 배움이었습니다.', 5);

INSERT INTO photos (id, src) VALUES
  (1, '/assets/capstoneimg.jpg'),
  (2, '/assets/classimg.jpg'),
  (3, '/assets/it.jpg'),
  (4, '/assets/itcomp.jpg'),
  (5, '/assets/lecture.jpg'),
  (6, '/assets/life.jpg'),
  (7, '/assets/noimage.jpg'),
  (8, '/assets/originalimg.png'),
  (9, '/assets/osaka.jpg'),
  (10, '/assets/semesterVideo.webm'),
  (11, '/assets/studyimg.jpg'),
  (12, '/assets/untityLogo.png'),
  (13, '/assets/workimg.jpg');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

