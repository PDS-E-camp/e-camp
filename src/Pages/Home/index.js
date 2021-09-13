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

  function handleClick(id) {
    localStorage.setItem("torneioID", id);
    // window.location.href = '/torneio';
  }

  useEffect(() => {
    function init() {
      Axios.get(`http://localhost:3001/`)
        .then((response) => {
          setTorneios(response.data.result);
          console.log(response.data.result);
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
              <>
                <Thumb key={item.id_torneio} item={item.link}>
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
        <Title title="Torneios" />
        <div className="slide">
          {torneios.map((item) => {
            return (
              <Thumb key={item.id} item={item.thumb}>
                <a onClick={() => handleClick(item.id)}>
                  <div className="thumb-content">
                    <h2>{item.nome}</h2>
                    <h1>{item.premio}</h1>
                    {/* <div>
                      <p>
                        Início: {item.dataI.getDate()}/{item.dataI.getMonth()}/
                        {item.dataI.getFullYear()}
                      </p>
                      <p>
                        Início: {item.dataF.getDate()}/{item.dataF.getMonth()}/
                        {item.dataF.getFullYear()}
                      </p>
                    </div> */}
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
