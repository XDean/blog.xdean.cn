CREATE DATABASE IF NOT EXISTS xdean;

USE xdean;

CREATE TABLE IF NOT EXISTS blog_post
(
    id   INT AUTO_INCREMENT,
    path TEXT NOT NULL,
    CONSTRAINT blog_post_pk PRIMARY KEY (id),
    CONSTRAINT UNIQUE INDEX blog_post_path_idx (path)
);



CREATE TABLE IF NOT EXISTS blog_post_like
(
    post_id INT                                 NOT NULL,
    user_id INT                                 NOT NULL,
    ip      VARCHAR(16)                         NOT NULL,
    time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT blog_post_like_fk FOREIGN KEY (post_id) REFERENCES blog_post (id),
    CONSTRAINT UNIQUE INDEX blog_post_like_unique_idx (post_id, user_id)
);

