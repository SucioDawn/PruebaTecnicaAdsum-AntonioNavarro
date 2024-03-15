create database testadsum;
use testadsum;

CREATE TABLE Contact (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
  nombreCompleto VARCHAR(200) NOT NULL,   
  nombreEmpresa VARCHAR(200) NOT NULL,  
  correo VARCHAR(100) NOT NULL,  
  telefono VARCHAR(10) NOT NULL,  
  categoria VARCHAR(50) NOT NULL,  
  mensaje VARCHAR(200) NOT NULL
);


select *from Contact c 