const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "ecamp_bd",
  multipleStatements: true
});

app.use(express.json());
app.use(cors());

app.post("/", (req,res) => {
  const id_torneio = req.body.id_torneio;
  const nome_torneio = req.body.nome_torneio;
  const dia = req.body.dia;

  db.query("SELECT * FROM torneio",(err, result) => {
      if (err) {
        res.send(err);
      }
      res.send({result});
    }
  );

  db.query("SELECT t.id_torneio, t.nome_torneio FROM torneio t WHERE t.id_torneio = ? OR t.nome_torneio = ?",
  [id_torneio, nome_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );

  db.query("SELECT p.id_partida, p.id_torneio, p.time1, p.time2, p.dia, p.hora, p.etapa FROM partida p, torneio t WHERE p.dia = ?",
  [dia],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );

});

app.post("/cadastro", (req, res) => {
  const nome = req.body.nome;
  const username = req.body.username;
  const email = req.body.email;
  const data_nasc = req.body.data_nasc;
  const sexo = req.body.sexo;
  const estado = req.body.estado;
  const municipio = req.body.municipio;
  const pais = req.body.pais;
  const senha = req.body.senha;

  db.query("SELECT * FROM cadastro WHERE email = ? OR username = ?", [email, username], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO cadastro (nome, username, email, data_nasc, sexo, estado, municipio, pais, senha) VALUES (?,?,?,?,?,?,?,?,?)",
          [nome, username, email, data_nasc, sexo, estado, municipio, pais, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso!" });
          }
        );
      });
    } else {
      res.send({ msg: "Email ou Username já cadastrado!" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM cadastro WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
        
          res.send({ msg: "Usuário logado!", result });
          console.log(response);
        } else {
          res.send({ msg: "Senha incorreta!" });
          console.log(response);
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.get("/perfil/:id_usuario", (req,res) => {
  const id_usuario = req.params.id_usuario;
  
  db.query("SELECT c.nome, c.username, c.data_nasc FROM cadastro c WHERE c.id_usuario = ?; " + 
  "SELECT t.id_torneio, t.link, t.nome_torneio FROM cadastro c, torneio t WHERE t.fk_id_usuario = ? AND t.fk_id_usuario = c.id_usuario;" +
  "SELECT t.nome_torneio FROM acompanhar_torneio a, cadastro c, torneio t WHERE a.fk_id_usuario = ? AND " + 
           "a.fk_id_usuario = c.id_usuario AND a.fk_id_torneio = t.id_torneio",
   [id_usuario, id_usuario, id_usuario], (err, result) => {
    if (err) {
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
});

app.post("/cadastrotorneio",(req,res) => {
  const link = req.body.link;
  const nome_torneio = req.body.nome_torneio;
  const qt_etapas = req.body.qt_etapas;
  const descricao = req.body.descricao;
  const fk_id_usuario = req.body.id_usuario;

  db.query("INSERT INTO torneio(link, nome_torneio,qt_etapas, descricao, fk_id_usuario) VALUES (?,?,?,?,?)",
    [link, nome_torneio,qt_etapas,descricao, fk_id_usuario],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Torneio cadastrado com sucesso!", result });
    }
  );
});

app.post("/torneio",(req,res) => {
  const comentario = req.body.comentario;
  const fk_id_usuario = req.body.id_usuario
  const fk_id_torneio = req.body.fk_id_torneio

  db.query("INSERT INTO comentarios_torneio (comentario, fk_id_usuario, fk_id_torneio) VALUES (?,?,?)",
  [comentario, fk_id_usuario,fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Comentário feito com sucesso!", result });
    }
  );
  
});

app.get("/torneio/:id_torneio",(req,res) => {
  const fk_id_torneio = req.params.id_torneio;

  db.query("SELECT c.username, ct.comentario FROM cadastro c, comentarios_torneio ct, torneio t " + 
  " WHERE ct.fk_id_torneio = ? AND c.id_usuario = ct.fk_id_usuario AND ct.fk_id_torneio = t.id_torneio",
  [fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );
});

app.post("/cadastropartida",(req,res) => {
  const time1 = req.body.time1;
  const time2 = req.body.time2;
  const hora = req.body.hora;
  const dia = req.body.dia;
  const etapa = req.body.etapa;
  const fk_id_torneio = req.body.fk_id_torneio;

  db.query("INSERT INTO partida(time1, time2, hora, dia, etapa, fk_id_torneio) VALUES (?,?,?,?,?,?)",
    [time1, time2, hora, dia, etapa, fk_id_torneio],
    (error, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Partida cadastrada com sucesso!", result });
    }
  );

});


app.post("/partida",(req,res) => {
  const comentario = req.body.comentario;
  const fk_id_usuario = req.body.id_usuario
  const fk_id_torneio = req.body.fk_id_torneio
  const fk_id_partida = req.body.fk_id_partida

  db.query("INSERT INTO comentarios_partida(comentario, fk_id_usuario, fk_id_partida, fk_id_torneio) VALUES (?,?,?,?);",
  [comentario, fk_id_usuario,fk_id_partida,fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Comentário feito com sucesso!", result });
    }
  );
  
});


app.get("/partida/:id_partida",(req,res) => {
  const fk_id_partida = req.params.id_partida;
  const fk_id_torneio = req.body.fk_id_torneio;

  db.query("SELECT c.username, cp.comentario FROM cadastro c, comentarios_partida cp, torneio t, partida p WHERE cp.fk_id_torneio = ? " +
  " AND cp.fk_id_partida = ? AND c.id_usuario = cp.fk_id_usuario AND cp.fk_id_torneio = t.id_torneio AND cp.fk_id_partida = p.id_partida",
  [fk_id_torneio, fk_id_partida],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );
});









app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
