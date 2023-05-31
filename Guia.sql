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

INSERT INTO Marca (nombre_marca) VALUES ('Toyota');
INSERT INTO Marca (nombre_marca) VALUES ('Ford');

INSERT INTO Modelo (nombre_modelo, id_marca) VALUES ('Corolla', 1);
INSERT INTO Modelo (nombre_modelo, id_marca) VALUES ('Camry', 1);
INSERT INTO Modelo (nombre_modelo, id_marca) VALUES ('Mustang',2);
INSERT INTO Modelo (nombre_modelo, id_marca) VALUES ('F-150', 2);


alter table Cliente add foreign key (usuario) references Usuario(cedula);
alter table Poliza add foreign key (cliente) references Cliente(cedula);

insert into Usuario (cedula,clave,tipo) 
	values ("111","111",1);

insert into Usuario (cedula,clave,tipo) 
	values ("222","222",1);

insert into Usuario (cedula,clave,tipo) 
	values ("333","333",2);	

insert into Cliente (cedula,nombre,usuario) 
	values ("111","J.Perez",'111');	

insert into Cliente (cedula,nombre,usuario) 
	values ("222","B.Banner",'222');

insert into Cliente (cedula,nombre,usuario) 
	values ("333","B.Banner",'333');


SET @fecha_inicio = CURDATE();	

insert into Categoria (descripcion) values ('Responsabilidad Civil');

insert into Cobertura (categoria_id, descripcion, costo_minimo, costo_porcentual) values (1, 'Daño Personas', 1000.00, 5.00);
insert into Cobertura (categoria_id, descripcion, costo_minimo, costo_porcentual) values (1, 'Daño a Vehiculos', 1000.00, 5.00);
insert into Cobertura (categoria_id, descripcion, costo_minimo, costo_porcentual) values (1, 'Daño a Inmuebles', 1000.00, 5.00);

insert into Poliza (placa,fecha_inicio,plazo_pago,auto, annio,costo_total, cliente, id_poliza_modelo) 
	values ("BKW251",@fecha_inicio, "Anual","Toyota - Telcel", "2022",20000.0, '111', 1);
	
insert into Poliza (placa,fecha_inicio,plazo_pago,auto, annio,costo_total, cliente, id_poliza_modelo) 
	values ("TKN875",@fecha_inicio, "Semestral","Mitsubishi - Montero", "2021",40000.0, '111', 2);
		
insert into Poliza (placa,fecha_inicio,plazo_pago,auto, annio,costo_total, cliente, id_poliza_modelo)
	values ("CDW326",@fecha_inicio, "Trimestral","Toyota - Fortuner", "2023",50000.0, '222', 3);

INSERT INTO Cobertura_Poliza (id_cobertura, id_poliza) VALUES (1, 1);
INSERT INTO Cobertura_Poliza (id_cobertura, id_poliza) VALUES (2, 1);