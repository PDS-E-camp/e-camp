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

app.get("/", (req,res) => {
  db.query("SELECT * FROM torneio t WHERE t.encerrado IS NULL",(err, result) => {
      if (err) {
        res.send(err);
      }
      res.send({result});
    }
  );

});

app.get("/alltorneios", (req,res) => {
  db.query("SELECT * FROM torneio t",(err, result) => {
      if (err) {
        res.send(err);
      }
      res.send({result});
    }
  );

});

app.get("/allpartidas", (req,res) => {
  db.query("SELECT * FROM partida",(err, result) => {
      if (err) {
        res.send(err);
      }
      res.send({result});
    }
  );

});

app.get("/partidas/:dia", (req,res) => {
  const dia = req.params.dia;
  db.query("SELECT * FROM partida p WHERE p.dia = ? AND p.encerrada IS NULL ",
  [dia],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );

});

app.post("/", (req,res) => {
  const id_torneio = req.body.id_torneio;
  const nome_torneio = req.body.nome_torneio;

  db.query("SELECT * FROM torneio t WHERE t.id_torneio = ? OR t.nome_torneio = ?",
  [id_torneio, nome_torneio],
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

            res.send({ msg: "Usu??rio cadastrado com sucesso!" });
          }
        );
      });
    } else {
      res.send({ msg: "Email ou Username j?? cadastrado!" });
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
        
          res.send({ msg: "Usu??rio logado!", result });
        } else {
          res.send({ msg: "Senha incorreta!" });
        }
      });
    } else {
      res.send({ msg: "Usu??rio n??o registrado!" });
    }
  });
});

app.get("/perfil/:id_usuario", (req,res) => {
  const id_usuario = req.params.id_usuario;
  
  db.query("SELECT c.nome, c.username, c.data_nasc FROM cadastro c WHERE c.id_usuario = ?; " + 
  "SELECT t.id_torneio, t.link, t.nome_torneio FROM cadastro c, torneio t WHERE t.fk_id_usuario = ? AND t.fk_id_usuario = c.id_usuario;" +
  "SELECT t.nome_torneio, t.link FROM acompanhar_torneio a, cadastro c, torneio t WHERE a.fk_id_usuario = ? AND " + 
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
  const fk_id_usuario = req.body.fk_id_usuario;

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

app.post("/torneio",(req,res) => {
  const comentario = req.body.comentario;
  const fk_id_usuario = req.body.fk_id_usuario;
  const fk_id_torneio = req.body.fk_id_torneio;

  db.query("INSERT INTO comentarios_torneio (comentario, fk_id_usuario, fk_id_torneio) VALUES (?,?,?)",
  [comentario, fk_id_usuario,fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Coment??rio feito com sucesso!", result });
    }
  );
  
});

app.post("/acompanhartorneio",(req,res) => {
  const fk_id_usuario = req.body.fk_id_usuario;
  const fk_id_torneio = req.body.fk_id_torneio;
  
   db.query("INSERT INTO acompanhar_torneio(fk_id_usuario, fk_id_torneio) VALUES (?,?)",
  [fk_id_usuario,fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Agora voc?? est?? acompanhando este torneio!", result });
    }
  );
  
});


app.put("/torneio",(req,res) => {
  const fk_id_torneio = req.body.fk_id_torneio;
  const resultado = req.body.resultado;
  const encerrado = req.body.encerrado;
  
  db.query("UPDATE torneio SET resultado = ?, encerrado = ? WHERE id_torneio = ?",
  [resultado, encerrado, fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Torneio Encerrado!", result });
    }
  );
   
});

app.post("/cadastropartida",(req,res) => {
  const link = req.body.link;
  const time1 = req.body.time1;
  const time2 = req.body.time2;
  const hora = req.body.hora;
  const dia = req.body.dia;
  const etapa = req.body.etapa;
  const fk_id_torneio = req.body.fk_id_torneio;

  db.query("INSERT INTO partida(time1, time2, hora, dia, etapa, fk_id_torneio, link) VALUES (?,?,?,?,?,?,?)",
    [time1, time2, hora, dia, etapa, fk_id_torneio, link],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Partida cadastrada com sucesso!", result });
    }
  );

});

app.post("/partidacomentarios",(req,res) => {
  const fk_id_partida = req.body.id_partida;
  const fk_id_torneio = req.body.fk_id_torneio;
  db.query("select c.username, cp.comentario FROM cadastro c, comentarios_partida cp, torneio t, partida p WHERE cp.fk_id_torneio = ? AND cp.fk_id_partida = ? AND c.id_usuario = cp.fk_id_usuario AND cp.fk_id_torneio = t.id_torneio AND cp.fk_id_partida = p.id_partida",
  [fk_id_torneio, fk_id_partida],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      console.log(result)
      res.send({result});
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

      res.send({ msg: "Coment??rio feito com sucesso!", result });
    }
  );
});

app.put("/encerrarpartida",(req,res) => {
  const fk_id_torneio = req.body.fk_id_torneio
  const fk_id_partida = req.body.fk_id_partida
  const resultado = req.body.resultado;
  const encerrada = req.body.encerrada;
  
   db.query("UPDATE partida SET resultado = ?, encerrada = ? WHERE id_partida = ? AND fk_id_torneio = ?",
  [resultado, encerrada, fk_id_partida, fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({ msg: "Partida Encerrada!", result });
    }
  );
});

// #Exibe as partidas de um torneio

app.get("/torneiopartidas/:id_torneio",(req,res) => {
  const fk_id_torneio = req.params.id_torneio;

  db.query("SELECT * FROM partida p WHERE p.fk_id_torneio = ?",
  [fk_id_torneio],
    (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send({result});
    }
  );
});

// #Exibe os torneios que um usu??rio acompanha e os que ele criou

app.get("/catorneio/:id_usuario",(req,res) => {
  const fk_id_usuario = req.params.id_usuario;

  db.query("SELECT t.id_torneio, t.nome_torneio, t.link FROM acompanhar_torneio a, cadastro c, torneio t WHERE a.fk_id_usuario = ? AND a.fk_id_usuario = c.id_usuario AND a.fk_id_torneio = t.id_torneio; SELECT * FROM torneio t WHERE t.fk_id_usuario = ?",
  [fk_id_usuario, fk_id_usuario],
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
