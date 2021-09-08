const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  senha: "kaio12",
  database: "ecamp_bd",
});

app.use(express.json());
app.use(cors());

app.post("/cadastro", (req, res) => {
  const nome = req.body.nome;
  const username = req.body.username;
  const email = req.body.email;
  const data_nasc = req.body.data_nasc;
  const sexo = req.body.sexo
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
          res.send({ msg: "Usuário logado!" });
        } else {
          res.send({ msg: "Senha incorreta!" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});



app.post("/cadastrotorneio", (req,red) => {
  






});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});