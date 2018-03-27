DROP DATABASE IF EXISTS home_db;
CREATE database home_db;

USE home_db;

CREATE TABLE realtor_list (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100),
    first_name VARCHAR(100) NULL,
    last_name VARCHAR(100) NULL,
    password VARCHAR(100) NULL,
    company VARCHAR(100) NULL,
    access VARCHAR(100) DEFAULT "user",
    date TIMESTAMP,
    PRIMARY KEY (id)
);

select * from realtor_list;