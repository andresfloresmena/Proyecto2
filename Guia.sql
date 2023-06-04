CREATE DATABASE Guia;

USE Guia;

create table Usuario (
  cedula varchar(10) not null,
  clave varchar(10),
  nombre varchar(30),
  telefono varchar(10),
  correo varchar(30),
  pago varchar(20),
  tipo integer,
  Primary key(cedula)
);

create table Cliente (
  cedula varchar(10) not null,
  nombre varchar(30),
  usuario varchar(10),
  Primary key(cedula)
);

CREATE TABLE Poliza (
    id_poliza INT AUTO_INCREMENT PRIMARY KEY,
    placa varchar(10),
    fecha_inicio DATE,
    plazo_pago ENUM('Trimestral', 'Semestral', 'Anual'),
    auto varchar(30),
    annio varchar(10),
    costo_total DECIMAL(10, 2),
    cliente varchar(10),
    id_poliza_modelo integer
);

CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

-- Crear tabla Cobertura
CREATE TABLE Cobertura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INTEGER NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    costo_minimo DECIMAL(10, 2) NOT NULL,
    costo_porcentual DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categoria (id) ON DELETE CASCADE
);

CREATE TABLE Marca (
    id_marca INT PRIMARY KEY AUTO_INCREMENT,
    nombre_marca VARCHAR(255) NOT NULL
);

CREATE TABLE Modelo (
    id_modelo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_modelo VARCHAR(255) NOT NULL,
    id_marca INT NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES Marca(id_marca)
);


CREATE TABLE Cobertura_Poliza (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cobertura INT NOT NULL,
    id_poliza INT NOT NULL,
    FOREIGN KEY (id_cobertura) REFERENCES Cobertura(id),
    FOREIGN KEY (id_poliza) REFERENCES Poliza(id_poliza)
);

alter table Cliente add foreign key (usuario) references Usuario(cedula);
alter table Poliza add foreign key (cliente) references Cliente(cedula);

insert into Usuario (cedula,clave,nombre,telefono,correo,pago,tipo) 
	values ("333","333","Administrador","0987654321","admin@gmail.com","N/A",2);

insert into Cliente (cedula,nombre,usuario) 
	values ("333","Administrador",'333');

SET @fecha_inicio = CURDATE();	
