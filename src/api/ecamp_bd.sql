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
numero_times int NOT NULL,
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
times varchar(200) NOT NULL, 
hora time NOT NULL,
dia date NOT NULL,
fk_id_torneio int NOT NULL,
foreign key(fk_id_torneio) references torneio(id_torneio)
);

CREATE TABLE IF NOT EXISTS times (
id_times int NOT NULL auto_increment primary key,
nome_time varchar(50) NOT NULL,
fk_id_torneio int NOT NULL,
foreign key(fk_id_torneio) references torneio(id_torneio)
);

CREATE TABLE IF NOT EXISTS jogadores (
id_jogador int NOT NULL auto_increment primary key,
fk_times int NOT NULL,
nome_jogador varchar(100) NOT NULL,
foreign key(fk_times) references times(id_times)
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
foreign key(fk_id_usuario) references cadastro(id_usuario),
foreign key(fk_id_partida) references partida(id_partida)
);
