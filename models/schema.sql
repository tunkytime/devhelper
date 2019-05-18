DROP DATABASE IF EXISTS prestigeWW_db;
CREATE DATABASE prestigeWW_db;

USE prestigeWW_db;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ;


DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
