CREATE DATABASE IF NOT EXISTS ecamp_bd;
USE ecamp_bd;

CREATE TABLE IF NOT EXISTS cadastro (
  id_usuario int NOT NULL auto_increment primary key,
  nome varchar(200) NOT NULL,
  username varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  data_nasc date NOT NULL,
  sexo varchar(50) NOT NULL,
  estado varchar(100) NOT NULL,
  municipio varchar(100) NOT NULL,
  pais varchar(100) NOT NULL,
  senha varchar(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS torneio (
id_torneio int NOT NULL auto_increment primary key,
link varchar(500), 
nome_torneio varchar(100) NOT NULL,
qt_etapas int NOT NULL,
descricao varchar(1000),
resultado varchar(200),
encerrado varchar(200),
fk_id_usuario int NOT NULL,
foreign key(fk_id_usuario) references cadastro(id_usuario)
);

CREATE TABLE IF NOT EXISTS acompanhar_torneio (
id_acompanhar_torneio int NOT NULL auto_increment primary key,
fk_id_usuario int NOT NULL,
fk_id_torneio int NOT NULL,
foreign key(fk_id_usuario) references cadastro(id_usuario),
foreign key(fk_id_torneio) references torneio(id_torneio)
);

CREATE TABLE IF NOT EXISTS partida (
id_partida int NOT NULL auto_increment primary key,
link varchar(500),
time1 varchar(200) NOT NULL, 
time2 varchar(200) NOT NULL,
hora time NOT NULL,
dia date NOT NULL,
etapa int NOT NULL,
resultado varchar(200),
encerrada varchar(200), 
fk_id_torneio int NOT NULL,
foreign key(fk_id_torneio) references torneio(id_torneio)
);

CREATE TABLE IF NOT EXISTS comentarios_torneio (
comentario varchar(400) NOT NULL,
fk_id_usuario int NOT NULL,
fk_id_torneio int NOT NULL,
foreign key(fk_id_usuario) references cadastro(id_usuario),
foreign key(fk_id_torneio) references torneio(id_torneio)
);

CREATE TABLE IF NOT EXISTS comentarios_partida (
comentario varchar(400) NOT NULL,
fk_id_usuario int NOT NULL,
fk_id_partida int NOT NULL,
fk_id_torneio int NOT NULL,
foreign key(fk_id_usuario) references cadastro(id_usuario),
foreign key(fk_id_partida) references partida(id_partida),
foreign key(fk_id_torneio) references torneio(id_torneio)
);




