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
  console.log(id_usuario)
  db.query("SELECT c.nome, c.username, c.data_nasc FROM cadastro c WHERE c.id_usuario = ?; " + 
  "SELECT t.link, t.nome_torneio FROM cadastro c, torneio t WHERE t.fk_id_usuario = ? AND c.id_usuario = ?;" +
  "SELECT t.nome_torneio FROM cadastro c, torneio t, acompanhar_torneio a WHERE a.fk_id_usuario = ? AND c.id_usuario = ? AND a.fk_id_torneio = t.id_torneio",
   [id_usuario, id_usuario, id_usuario, id_usuario, id_usuario, id_usuario], (err, result) => {
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
  const numero_times = req.body.numero_torneio;

  db.query("INSERT INTO torneio(link, nome_torneio,numero_times,fk_id_usuario) VALUES (?,?,?,?)",
    [link, nome_torneio,numero_times,fk_id_usuario],
    (error, response) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Torneio cadastrado com sucesso!" });
    }
  );

});


app.post("/cadastropartida",(req,res) => {
  const times = req.body.times;
  const hora = req.body.hora;
  const dia = req.body.dia;

  db.query("INSERT INTO partida(times, hora, dia,fk_id_torneio) VALUES (?,?,?,?)",
    [times, hora, dia,fk_id_torneio],
    (error, response) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Partida cadastrada com sucesso!" });
    }
  );

});















app.listen(3001, () => {
  console.log("rodando na porta 3001");
});