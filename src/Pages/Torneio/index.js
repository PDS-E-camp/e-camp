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
  const [partidas, setPartidas] = useState([])

  const [torneioAtual, setTorneioAtual] = useState({});

  function getComentarios() {
    const id_torneio = window.localStorage.getItem("id_torneio");
    Axios.get(`http://localhost:3001/torneio/${id_torneio}`).then(
      (response) => {
        setComentarios(response.data.result);
      }
    );
  }

  function getPartidas(){
    const id_torneio = window.localStorage.getItem("id_torneio");
    Axios.get(`http://localhost:3001/torneiopartidas/${id_torneio}`)
    .then((response) => {
      setPartidas(response.data.result)
      console.log(response.data.result)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const id_torneio = window.localStorage.getItem("id_torneio");
    function init() {
      Axios.get(`http://localhost:3001/`)
        .then((response) => {
          response.data.result.map((item) => {
            if (item.id_torneio.toString() === id_torneio) {
              setTorneioAtual(item);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    init();
    getComentarios();
    getPartidas()
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const id_usuario = window.localStorage.getItem("id_usuario");
    const id_torneio = window.localStorage.getItem("id_torneio");
    if (!textArea) {
      alert("Preencha o comentário corretamente.");
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

  return (
    <ContainerJogo capa={torneioAtual.link}>
      <Navbar />
      <section className="content-jogo">
        <div className="capa" />
        <div className="content">
          <div className="titulo-button">
            <div>
              <p className="rodada">{torneioAtual.nome_torneio}</p>
              <p className="descricao">{torneioAtual.descricao}</p>
            </div>
            <button
              className="partida"
              onClick={() => (window.location.href = "/cadastropartida")}
            >
              Criar Partida
            </button>
          </div>
          <div className="slide">
              {partidas.reverse().map((item) => {
                return (
                  <>
                    <Thumb key={item.id_partida} item={item.link}>
                      <a>
                        <div className="thumb-content">
                          <h2>{item.time1} x {item.time2}</h2>
                        </div>
                      </a>
                    </Thumb>
                  </>
                );
              })}
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
