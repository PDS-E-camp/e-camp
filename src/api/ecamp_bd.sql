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
nome_jogador varchar(100) NOT NULL,
fk_id_times int NOT NULL,
foreign key(fk_id_times) references times(id_times)
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

-- -----------------------------------------------------------------------------------------------------------------------

insert into cadastro (nome, username, email, data_nasc, sexo, 
estado, municipio, pais, senha) values ('José Maria', 'jmaria', 
'ze@gmail.com','1960-01-10','Masculino', 'Maranhão', 'São Luís', 
'Brasil', '123456' );

insert into cadastro (nome, username, email, data_nasc, sexo, 
estado, municipio, pais, senha) values ('Marta Cristina', 'mcristina', 
'cristina@gmail.com','1980-08-15','Feminino', 'São Paulo', 'São Paulo', 
'Brasil', '123456' );

insert into cadastro (nome, username, email, data_nasc, sexo, 
estado, municipio, pais, senha) values ('Alberto Gastão', 'agastao', 
'gastao@gmail.com','1986-04-06','Masculino', 'Paraíba', 'João Pessoa', 
'Brasil', '123456' );

insert into torneio (link, nome_torneio, numero_times,fk_id_usuario) values ("lsdasdlajdlkajdskl", "Teste", 10, 1);
insert into torneio (link, nome_torneio, numero_times,fk_id_usuario) values ("lsdasdlajdlkajdskl", "Teste2", 5, 2);
insert into torneio (link, nome_torneio, numero_times,fk_id_usuario) values ("lsdasdlajdlkajdskl", "Teste3", 20, 1);
insert into torneio (link, nome_torneio, numero_times,fk_id_usuario) values ("lsdasdlajdlkajdskl", "Teste4", 15, 2);

insert into partida(times, hora, dia,fk_id_torneio) values ('São Paulo x Bahia', '18:00', '2021-10-29', 1);
insert into partida(times, hora, dia,fk_id_torneio) values ('Craxs x Boers', '06:00', '2022-01-05', 1);


insert into acompanhar_torneio (fk_id_usuario, fk_id_torneio) values (1,4);
insert into acompanhar_torneio (fk_id_usuario, fk_id_torneio) values (3,1);
insert into acompanhar_torneio (fk_id_usuario, fk_id_torneio) values (3,4);
insert into acompanhar_torneio (fk_id_usuario, fk_id_torneio) values (2,3);

insert into comentarios_torneio(comentario, fk_id_usuario, fk_id_torneio) values ('Gostei muito', 3, 1);
insert into comentarios_torneio(comentario, fk_id_usuario, fk_id_torneio) values ('Gostei sim', 3, 2);
insert into comentarios_torneio(comentario, fk_id_usuario, fk_id_torneio) values ('Gostei não', 2, 2);
insert into comentarios_torneio(comentario, fk_id_usuario, fk_id_torneio) values ('Gostei, mas queria um maior', 1, 1);

insert into comentarios_partida (comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) values ('Gostei', 3, 1, 1);
insert into comentarios_partida (comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) values ('Queria mais', 2, 1, 1);
insert into comentarios_partida (comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) values ('Gosto muito', 3, 1, 1);
insert into comentarios_partida (comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) values ('Gosto ', 3, 2, 1);

-- ------------------------------------------------------------------------------------------------------------------------------
select * from comentarios_torneio;
delete from cadastro where id_usuario = 2;

-- perfil
select c.nome, c.username, c.data_nasc from cadastro c where c.id_usuario = ?;
select t.link, t.nome_torneio from cadastro c, torneio t where t.fk_id_usuario = ? and c.id_usuario = ?; -- gerenciador
select t.nome_torneio from cadastro c, torneio t, acompanhar_torneio a where a.fk_id_usuario = ? and c.id_usuario = ? and a.fk_id_torneio = t.id_torneio; -- participante

-- cadastro torneio
insert into torneio(link, nome_torneio,numero_times,fk_id_usuario) values (?,?,?,?);

-- cadastro acompanhar torneio
insert acompanhar_torneio(fk_id_usuario, fk_id_torneio) values (?,?);

-- cadastro partida
insert into partida(times, hora, dia,fk_id_torneio) values (?,?,?,?);
-- partida 
select p.times, p.hora, p.dia from torneio t, partida p where t.id_torneio = ? and p.fk_id_torneio = ?;

-- cadastro times
insert into times (nome_time, fk_id_torneio) values (?,?);

-- cadastro jogadores
insert into jogadores (nome_jogador, fk_id_times) values (?,?);

-- cadastro comentários torneio
insert into comentarios_torneio (comentario, fk_id_usuario, fk_id_torneio) values (?,?,?);

-- comentarios torneio
select distinct c.username, ct.comentario from cadastro c, comentarios_torneio ct, torneio t where t.id_torneio = ? and ct.fk_id_torneio = ? and c.id_usuario = ct.fk_id_usuario;

-- cadastro comentarios partida
insert into comentarios_partida (comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) values (?,?,?,?);

-- comentarios partida
select distinct c.username, cp.comentario from cadastro c, comentarios_partida cp, torneio t, partida p where t.id_torneio = ? and cp.fk_id_torneio = ? and cp.fk_id_partida = ? and c.id_usuario = cp.fk_id_usuario;








