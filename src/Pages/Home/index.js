import React, { useEffect } from "react";

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
  const torneios = [
    {
      id: 1,
      nome: "Copa LOL",
      premio: "5 mil reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: lol,
      capa: capaLol,
      rodada: 10,
    },
    {
      id: 2,
      nome: "Copa FF",
      premio: "1 mil reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 8,
    },
    {
      id: 3,
      nome: "Copa FIFA",
      premio: "2 mil reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: FIFA,
      capa: capaFifa,
      rodada: 6,
    },
    {
      id: 4,
      nome: "Copa LOLzin",
      premio: "2 mil reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: lol,
      capa: capaLol,
      rodada: 7,
    },
    {
      id: 5,
      nome: "Copa FFzin",
      premio: "500 reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 2,
    },
    {
      id: 6,
      nome: "Copa FIFinha",
      premio: "3 mil reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: FIFA,
      capa: capaFifa,
      rodada: 1,
    },
    {
      id: 7,
      nome: "Copa 3X",
      premio: "2500 reais",
      dataI: new Date("May 17, 2021 03:24:00"),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 4,
    },
  ];

  function handleClick(id) {
    localStorage.setItem("torneioID", id);
    // window.location.href = '/torneio';
  }

  useEffect(() => {
    function init() {
      Axios.post(`http://localhost:3001`, {
        id_torneio: "",
        nome_torneio: "",
        dia: "",
      })
        .then((response) => {
          console.log(response);
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
        <Title title="Acontecendo agora" />
        <div className="slide">
          {torneios.reverse().map((item) => {
            return (
              <Thumb key={item.id} item={item.thumb}>
                <a>
                  <div className="thumb-content">
                    <h2>{item.nome}</h2>
                    <h1>{item.premio}</h1>
                    <div>
                      <p>
                        Início: {item.dataI.getDate()}/{item.dataI.getMonth()}/
                        {item.dataI.getFullYear()}
                      </p>
                      <p>
                        Início: {item.dataF.getDate()}/{item.dataF.getMonth()}/
                        {item.dataF.getFullYear()}
                      </p>
                    </div>
                  </div>
                </a>
              </Thumb>
            );
          })}
        </div>
        <Title title="Torneios" />
        <div className="slide">
          {torneios.map((item) => {
            return (
              <Thumb key={item.id} item={item.thumb}>
                <a onClick={() => handleClick(item.id)}>
                  <div className="thumb-content">
                    <h2>{item.nome}</h2>
                    <h1>{item.premio}</h1>
                    <div>
                      <p>
                        Início: {item.dataI.getDate()}/{item.dataI.getMonth()}/
                        {item.dataI.getFullYear()}
                      </p>
                      <p>
                        Início: {item.dataF.getDate()}/{item.dataF.getMonth()}/
                        {item.dataF.getFullYear()}
                      </p>
                    </div>
                  </div>
                </a>
              </Thumb>
            );
          })}
        </div>
      </section>
      <Footer />
    </ContainerHome>
  );
}

export default Home;
