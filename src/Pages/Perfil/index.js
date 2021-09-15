import React, { useEffect, useState } from "react";

import { ContainerPerfil, Card } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";
import ff from "../../assets/images/ff.png";
import FIFA from "../../assets/images/fifa.png";
import lol from "../../assets/images/lol.png";
import Footer from "../../Components/Footer";
import Axios from "axios";

function Perfil() {
  const [perfil, setPerfil] = useState("");
  const [dataNasc, setDataNasc] = useState(new Date());

  const [arrayGerencio, setArrayGerencio] = useState([]);
  const [arrayAcompanho, setArrayAcompanho] = useState([]);

  useEffect(() => {
    const id_usuario = window.localStorage.getItem("id_usuario");
    function init() {
      Axios.get(`http://localhost:3001/perfil/${id_usuario}`).then(
        (response) => {
          window.localStorage.setItem("username", response.data[0][0].username);
          setPerfil(response.data[0][0]);
          const date = new Date(response.data[0][0].data_nasc);
          setDataNasc(date);
        }
      );
    }
    init();
  }, []);

  useEffect(() => {
    const id_usuario = window.localStorage.getItem("id_usuario");

    Axios.get(`http://localhost:3001/catorneio/${id_usuario}`).then(
      (response) => {
        const arrayAcompanha = response.data.result[0];
        const result = arrayAcompanha
          .map((e) => JSON.stringify(e))
          .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
          .map((e) => JSON.parse(e));
        setArrayAcompanho(result);
        console.log(result);
      }
    );

    Axios.get(`http://localhost:3001/catorneio/${id_usuario}`).then(
      (response) => {
        const arrayGerencia = response.data.result[1];
        const result = arrayGerencia
          .map((e) => JSON.stringify(e))
          .reduce((acc, cur) => (acc.includes(cur) || acc.push(cur), acc), [])
          .map((e) => JSON.parse(e));
        setArrayGerencio(result);
      }
    );
  }, []);

  function handleClick(id) {
    localStorage.setItem("id_torneio", id);
    window.location.href = "/torneio";
  }

  return (
    <ContainerPerfil>
      <Navbar />
      <section className="content-perfil">
        <div className="content">
          <div className="data">
            <div className="foto-perfil" />
            <div className="informacoes">
              <div>
                <h1>{perfil.username}</h1>
                <p>{perfil.nome}</p>
                <p>
                  {dataNasc.getDate()}/{dataNasc.getMonth() + 1}/
                  {dataNasc.getFullYear()}
                </p>
              </div>
              <div>
                <p>
                  Gerencia <span>{arrayGerencio.length}</span> Torneios
                </p>
                <p>
                  Participa de <span>{arrayAcompanho.length}</span> Torneios
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className="section-ger-part">
          <div className="gerencio">
            <h1>Camps que gerencio</h1>
            <div className="section-card">
              {arrayGerencio.map((item, index) => {
                return (
                  <Card
                    key={item.id_torneio}
                    image={item.link}
                    onClick={() => handleClick(item.id_torneio)}
                  >
                    <div className="cover" />
                    <p>{item.nome_torneio}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section-ger-part participo">
          <div className="gerencio">
            <h1>Camps que acompanho</h1>
            <div className="section-card">
              {arrayAcompanho.map((item, index) => {
                return (
                  <Card
                    key={item.id_torneio}
                    image={item.link}
                    onClick={() => handleClick(item.id_torneio)}
                  >
                    <div className="cover" />
                    <p>{item.nome_torneio}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </ContainerPerfil>
  );
}

export default Perfil;
