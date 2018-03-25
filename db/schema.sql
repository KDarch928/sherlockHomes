DROP DATABASE IF EXISTS home_db;
CREATE database home_db;

USE home_db;

CREATE TABLE mail_listing (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100),
    firt_name varchar(100) NULL,
    last_name varchar(100) null,
    password  varchar(100) null,
    date TIMESTAMP,
    PRIMARY KEY (id)
);

select * from mail_listing;