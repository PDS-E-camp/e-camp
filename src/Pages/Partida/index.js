import React, { useEffect, useState } from "react";

import { ContainerJogo, Thumb } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";

import Footer from "../../Components/Footer";
import Axios from "axios";

function Partida() {
  const [name, setName] = useState(window.localStorage.getItem("username"));
  const [textArea, setTextArea] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [dia, setDia] = useState(new Date());
  const [partidaAtual, setPartidaAtual] = useState({});

  function getComentarios() {
    const id_partida = window.localStorage.getItem("id_partida");
    const fk_id_torneio = window.localStorage.getItem("id_partida_torneio");
    console.log(id_partida);
    console.log(fk_id_torneio);
    Axios.post(`http://localhost:3001/partidacomentarios`, {
      id_partida: id_partida,
      fk_id_torneio,
    }).then((response) => {
      setComentarios(response.data.result);
    });
  }

  useEffect(() => {
    const fk_id_torneio = window.localStorage.getItem("id_partida_torneio");
    const id_partida = window.localStorage.getItem("id_partida");
    function init() {
      Axios.get(`http://localhost:3001/allpartidas`)
        .then((response) => {
          response.data.result.map((item) => {
            if (item.id_partida.toString() === id_partida) {
              setPartidaAtual(item);
              console.log(item);
              const date = new Date(item.dia);
              setDia(date);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    init();
    getComentarios();
  }, []);

  // verifica admin
  useEffect(() => {
    const id_usuario = window.localStorage.getItem("id_usuario");
    const fk_id_torneio = window.localStorage.getItem("id_partida_torneio");
    function init() {
      Axios.get(`http://localhost:3001/alltorneios`)
        .then((response) => {
          const arrayAdmin = [];
          response.data.result.map((item) => {
            if (item.id_torneio.toString() === fk_id_torneio) {
              if (item.fk_id_usuario.toString() === id_usuario) {
                arrayAdmin.push(item);
              }
            }
          });
          console.log(arrayAdmin);
          if (arrayAdmin.length > 0) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    init();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const id_usuario = window.localStorage.getItem("id_usuario");
    const id_torneio = window.localStorage.getItem("id_partida_torneio");
    const id_partida = window.localStorage.getItem("id_partida");
    if (!textArea) {
      alert("Preencha o comentário corretamente.");
    } else {
      Axios.post("http://localhost:3001/partida", {
        comentario: textArea,
        id_usuario: id_usuario,
        fk_id_torneio: id_torneio,
        fk_id_partida: id_partida,
      }).then((response) => {
        getComentarios();
        setTextArea("");
      });
    }
  }

  return (
    <ContainerJogo capa={partidaAtual.link}>
      <Navbar />
      <section className="content-jogo">
        <div className="capa">
          {partidaAtual.encerrada === "sim" && (
            <div className="texto-resultado">
              <p className="status">ENCERRADO</p>
              <p className="rodada resultado">
                Resultado: {partidaAtual.resultado}
              </p>
            </div>
          )}
        </div>
        <div className="content">
          <div className="titulo-button">
            <div>
              <p className="rodada">
                {partidaAtual.time1} x {partidaAtual.time2}
              </p>
              <p className="descricao">
                Código da partida: {partidaAtual.id_partida}
              </p>
              <p className="descricao">Horário: {partidaAtual.hora}</p>
              <p className="descricao">
                Dia: {dia.getDate()}/
                {dia.getMonth() + 1 < 10
                  ? "0" + (dia.getMonth() + 1)
                  : dia.getMonth()}
                /{dia.getFullYear()}
              </p>
              <p className="descricao">Etapa: {partidaAtual.etapa}</p>
              <p className="descricao">
                Resultado:{" "}
                {partidaAtual.resultado === null
                  ? "aguardando"
                  : partidaAtual.resultado}
              </p>
            </div>
            {partidaAtual.encerrada !== "sim" && admin && (
              <button
                className="encerrar"
                onClick={() => (window.location.href = "/encerrarpartida")}
              >
                Encerrar Partida
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <label>Comentários</label>
            <textarea
              id="textarea"
              value={textArea}
              onChange={(event) => setTextArea(event.target.value)}
              placeholder="Digique aqui o seu comentário"
            />
            <button disabled={!name || !textArea}>ENVIAR</button>
          </form>
          <div className="comentarios">
            {comentarios
              .map((item) => {
                return (
                  <div key={item.comentario}>
                    <p className="nome">{item.username}</p>
                    <p className="texto">{item.comentario}</p>
                  </div>
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

export default Partida;
