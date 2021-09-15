import React, { useEffect, useState } from "react";

import { ContainerCadastro } from "./styles";
import { GrNext } from "react-icons/gr";
import Axios from "axios";
//componentes
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function Cadastro() {
  const [form, setForm] = useState({
    link: "",
    time1: "",
    time2: "",
    hora: "",
    dia: "",
    etapa: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fk_id_torneio = window.localStorage.getItem("id_torneio");
    if (
      !form.link ||
      !form.time1 ||
      !form.time2 ||
      !form.hora ||
      !form.dia ||
      !form.etapa
    ) {
      alert("Há campos não preenchidos, preencha o cadastro corretamente.");
    } else {
      Axios.post("http://localhost:3001/cadastropartida", {
        link: form.link,
        time1: form.time1,
        time2: form.time2,
        hora: `${form.hora}:00`,
        dia: form.dia,
        etapa: form.etapa,
        fk_id_torneio: fk_id_torneio,
      })
        .then((response) => {
          alert(response.data.msg);
          window.location.href = "/torneio";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
    console.log({ ...form, [id]: value });
  }

  return (
    <ContainerCadastro linkCapa={form.link}>
      <Navbar />
      <section className="content-Cadastro">
        <div className="modal">
          <h1>Cadastrar Partida</h1>
          <div className={`capa ${!form.link && "capa-default"}`} />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Link da capa"
            />
            <input
              type="text"
              id="time1"
              value={form.time1}
              onChange={handleChange}
              placeholder="Time 1"
            />
            <input
              type="text"
              id="time2"
              value={form.time2}
              onChange={handleChange}
              placeholder="Time 2"
            />
            <input
              type="time"
              id="hora"
              value={form.hora}
              onChange={handleChange}
              placeholder="Hora"
            />
            <input
              type="date"
              id="dia"
              value={form.dia}
              onChange={handleChange}
              placeholder="Dia"
            />
            <input
              type="number"
              id="etapa"
              value={form.etapa}
              onChange={handleChange}
              placeholder="Etapa"
            />

            <button className="finalizar" onClick={handleSubmit}>
              FINALIZAR
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Cadastro;
