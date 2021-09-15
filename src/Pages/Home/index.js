import React, { useEffect, useState } from "react";

import { ContainerHome, Thumb } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";
import Title from "./Title";
import ff from "../../assets/images/ff.png";
import FIFA from "../../assets/images/fifa.png";
import lol from "../../assets/images/lol.png";
import capaFf from "../../assets/images/capa-ff.png";
import capaLol from "../../assets/images/capa-lol.png";
import capaFifa from "../../assets/images/capa-fifa.png";
import Footer from "../../Components/Footer";
import Axios from "axios";

function Home() {
  const [torneios, setTorneios] = useState([]);
  const [partidas, setPartidas] = useState([]);

  function handleClick(id) {
    localStorage.setItem("id_torneio", id);
    window.location.href = "/torneio";
  }
  function handleClickPartida(idPartida, idTorneio) {
    localStorage.setItem("id_partida", idPartida);
    localStorage.setItem("id_partida_torneio", idTorneio);
    window.location.href = "/partida";
  }

  useEffect(() => {
    function init() {
      Axios.get(`http://localhost:3001/`)
        .then((response) => {
          setTorneios(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    init();
  }, []);

  useEffect(() => {
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    if (mes < 10) {
      mes = `0${mes}`;
    }
    function init() {
      Axios.get(`http://localhost:3001/partidas/${ano}-${mes}-${dia}`)
        .then((response) => {
          console.log(response)
          setPartidas(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    init();
  }, []);

  return (
    <ContainerHome>
      <Navbar />
      <section className="content-home">
        {partidas.length > 0 && (
          <>
            <Title title="Partidas Hoje" />
            <div className="slide">
              {partidas.reverse().map((item) => {
                return (
                  <>
                    <Thumb
                      key={item.id_partida}
                      item={item.link}
                      onClick={() => handleClickPartida(item.id_partida, item.fk_id_torneio)}
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
              })}
            </div>
          </>
        )}
        <Title title="Torneios" />
        <div className="slide">
          {torneios.reverse().map((item) => {
            return (
              <>
                <Thumb
                  key={item.id_torneio}
                  item={item.link}
                  onClick={() => handleClick(item.id_torneio)}
                >
                  <a>
                    <div className="thumb-content">
                      <h2>{item.nome_torneio}</h2>
                    </div>
                  </a>
                </Thumb>
              </>
            );
          })}
        </div>
      </section>
      <Footer />
    </ContainerHome>
  );
}

export default Home;
