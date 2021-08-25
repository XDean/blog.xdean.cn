CREATE DATABASE IF NOT EXISTS xdean;

USE xdean;

CREATE TABLE IF NOT EXISTS blog_post_like
(
    post_id TEXT                                NOT NULL,
    user_id INT                                 NOT NULL,
    time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT UNIQUE INDEX blog_post_like_unique_idx (post_id, user_id)
);

