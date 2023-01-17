-- Database para la App Completa --
create database ; proyectofinal

-- Selecciono la Database -- 
use ; proyectofinal 


-- tabla de productos  --
create table productos(
idProducto int unsigned not null auto_increment,
nombre varchar(150) not null,
codigo int not null,
precio int not null,
primary key (idProducto)
);

-- tabla de contacto --
create table contacto(
idContacto int unsigned not null auto_increment,
nombre varchar(150) not null,
email varchar(150) not null,
primary key (idContacto)
);
