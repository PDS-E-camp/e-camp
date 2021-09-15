import React, { useEffect, useState } from "react";

import { ContainerHome, Thumb } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";
import Title from "./Title";

import Footer from "../../Components/Footer";
import Axios from "axios";

function Busca() {
  const [partida, setPartida] = useState("");
  const id_busca = window.localStorage.getItem("id_busca");
  function handleClickPartida(idPartida, idTorneio) {
    localStorage.setItem("id_partida", idPartida);
    localStorage.setItem("id_partida_torneio", idTorneio);
    window.location.href = "/partida";
  }

  useEffect(() => {
    function init() {
      Axios.get(`http://localhost:3001/allpartidas`)
        .then((response) => {
          response.data.result.map((item) => {
            if (item.id_partida.toString() === id_busca) {
              console.log(item);
              setPartida(item);
            }
          });
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
        <>
          {partida ? (
            <Title title="Partida encontrada" />
          ) : (
            <div className="nao-encotrada">
              <h1>Nenhuma partida encontrada :(</h1>
            </div>
          )}
          {partida && (
            <div className="slide">
              <>
                <Thumb
                  item={partida.link}
                  onClick={() =>
                    handleClickPartida(
                      partida.id_partida,
                      partida.fk_id_torneio
                    )
                  }
                >
                  <a>
                    <div className="thumb-content">
                      <h2>
                        {partida.time1} x {partida.time2}
                      </h2>
                    </div>
                  </a>
                </Thumb>
              </>
            </div>
          )}
        </>
      </section>
      <Footer />
    </ContainerHome>
  );
}

export default Busca;
