CREATE DATABASE shopping_db;
USE shopping_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    event_type VARCHAR(50),
    item_name VARCHAR(100),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;

SELECT * FROM users;
SELECT * FROM activity_log;

drop table activity_log;
