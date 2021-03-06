import React, { useEffect, useState } from "react";

import { ContainerJogo, Thumb } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";

import Footer from "../../Components/Footer";
import Axios from "axios";

function Torneio() {
  const [name, setName] = useState(window.localStorage.getItem("username"));
  const [textArea, setTextArea] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [torneioAtual, setTorneioAtual] = useState({});

  function getComentarios() {
    const id_torneio = window.localStorage.getItem("id_torneio");
    Axios.get(`http://localhost:3001/torneio/${id_torneio}`).then(
      (response) => {
        setComentarios(response.data.result);
      }
    );
  }

  function getPartidas() {
    const id_torneio = window.localStorage.getItem("id_torneio");
    Axios.get(`http://localhost:3001/torneiopartidas/${id_torneio}`)
      .then((response) => {
        setPartidas(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const id_torneio = window.localStorage.getItem("id_torneio");
    const id_usuario = window.localStorage.getItem("id_usuario");
    console.log(typeof id_usuario);
    function init() {
      Axios.get(`http://localhost:3001/alltorneios`)
        .then((response) => {
          const arrayAdmin = [];
          response.data.result.map((item) => {
            console.log(item.fk_id_usuario.toString(), id_usuario);

            if (item.id_torneio.toString() === id_torneio) {
              setTorneioAtual(item);
              if (item.fk_id_usuario.toString() === id_usuario) {
                arrayAdmin.push(item);
              }
            }
          });
          console.log(arrayAdmin);
          if (arrayAdmin.length > 0) {
           setAdmin(true)
          } else {
            setAdmin(false)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    init();
    getComentarios();
    getPartidas();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const id_usuario = window.localStorage.getItem("id_usuario");
    const id_torneio = window.localStorage.getItem("id_torneio");
    if (!textArea) {
      alert("Preencha o coment??rio corretamente.");
    } else {
      Axios.post("http://localhost:3001/torneio", {
        comentario: textArea,
        fk_id_usuario: id_usuario,
        fk_id_torneio: id_torneio,
      }).then((response) => {
        getComentarios();
        setTextArea("");
      });
    }
  }

  function handleClickPartida(idPartida, idTorneio) {
    localStorage.setItem("id_partida", idPartida);
    localStorage.setItem("id_partida_torneio", idTorneio);
    window.location.href = "/partida";
  }

  //fun????es para acompanhar abaixo

  function acompanharTorneio(params) {
    const id_usuario = window.localStorage.getItem("id_usuario");
    const id_torneio = window.localStorage.getItem("id_torneio");
    Axios.post("http://localhost:3001/acompanhartorneio", {
      fk_id_usuario: id_usuario,
      fk_id_torneio: id_torneio,
    }).then((response) => {
      alert(response.data.msg);
    });
  }

  return (
    <ContainerJogo capa={torneioAtual.link}>
      <Navbar />
      <section className="content-jogo">
        <div className="capa">
          {" "}
          {torneioAtual.encerrado === "sim" && (
            <div className="texto-resultado">
              <p className="status">ENCERRADO</p>
              <p className="rodada resultado">
                Resultado: {torneioAtual.resultado}
              </p>
            </div>
          )}
        </div>
        <div className="content">
          <div className="titulo-button">
            <div>
              <p className="rodada">{torneioAtual.nome_torneio}</p>
              <p className="descricao">{torneioAtual.descricao}</p>
            </div>
            {torneioAtual.encerrado !== "sim" && (
              <div className="buttons">
                <button className="acompanhar" onClick={acompanharTorneio}>
                  Acompanhar Torneio
                </button>
                {admin && (
                  <>
                    <button
                      className="partida"
                      onClick={() =>
                        (window.location.href = "/cadastropartida")
                      }
                    >
                      Criar Partida
                    </button>
                    <button
                      className="encerrar"
                      onClick={() =>
                        (window.location.href = "/encerrartorneio")
                      }
                    >
                      Encerrar Torneio
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          {torneioAtual.encerrado !== "sim" && (
            <div className="slide">
              {partidas
                .map((item) => {
                  return (
                    <>
                      <Thumb
                        key={item.id_partida}
                        item={item.link}
                        onClick={() =>
                          handleClickPartida(
                            item.id_partida,
                            item.fk_id_torneio
                          )
                        }
                      >
                        <a>
                          <div className="thumb-content">
                            <h2>
                              {item.time1} x {item.time2}
                            </h2>
                          </div>
                        </a>
                      </Thumb>
                    </>
                  );
                })
                .reverse()}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Coment??rios</label>
            <textarea
              id="textarea"
              value={textArea}
              onChange={(event) => setTextArea(event.target.value)}
              placeholder="Digique aqui o seu coment??rio"
            />
            <button disabled={!name || !textArea}>ENVIAR</button>
          </form>
          <div className="comentarios">
            {comentarios
              .map((item) => {
                return (
                  <>
                    <p className="nome">{item.username}</p>
                    <p className="texto">{item.comentario}</p>
                  </>
                );
              })
              .reverse()}
          </div>
        </div>
      </section>
      <Footer />
    </ContainerJogo>
  );
}

export default Torneio;
