import React, { useEffect, useState } from "react";

import { ContainerCadastro } from "./styles";

//componentes
import Navbar from "../../Components/Navbar";
import ff from "../../assets/images/ff.png";
import FIFA from "../../assets/images/fifa.png";
import lol from "../../assets/images/lol.png";
import capaFf from "../../assets/images/capa-ff.png";
import capaLol from "../../assets/images/capa-lol.png";
import capaFifa from "../../assets/images/capa-fifa.png";
import Footer from "../../Components/Footer";
import Axios from "axios";

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    username: "",
    email: "",
    data_nasc: "",
    sexo: "",
    estado: "",
    municipio: "",
    pais: "",
    senha: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post("http://localhost:3001/cadastro", {
      nome: form.nome,
      username: form.username,
      email: form.email,
      data_nasc: form.data_nasc,
      sexo: form.sexo,
      estado: form.estado,
      municipio: form.municipio,
      pais: form.pais,
      senha: form.senha,
    }).then((response) => {
      alert(response.data.msg);
    });
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  return (
    <ContainerCadastro>
      <Navbar />
      <section className='content-Cadastro'>
        <div className='modal'>
          <h1>E-camp</h1>
          <form onSubmit={handleSubmit}>
            <input
              type='nome'
              id='nome'
              value={form.nome}
              onChange={handleChange}
              placeholder='nome'
            />
            <input
              type='username'
              id='username'
              value={form.username}
              onChange={handleChange}
              placeholder='username'
            />
            <input
              type='email'
              id='email'
              value={form.email}
              onChange={handleChange}
              placeholder='email'
            />
            <input
              type='date'
              id='date'
              value={form.data_nasc}
              onChange={handleChange}
            />
            <select id='sexo' value={form.sexo} onChange={handleChange}>
              <option value='Masculino'>Masculino</option>
              <option value='Feminino'>Feminino</option>
            </select>
            <input
              type='text'
              id='estado'
              value={form.estado}
              onChange={handleChange}
              placeholder='estado'
            />
            <input
              type='text'
              id='municipio'
              value={form.municipio}
              onChange={handleChange}
              placeholder='municipio'
            />
            <input
              type='text'
              id='pais'
              value={form.pais}
              onChange={handleChange}
              placeholder='país'
            />
            <input
              type='password'
              id='senha'
              value={form.senha}
              onChange={handleChange}
              placeholder='senha'
            />
            <button>CADASTRAR</button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Cadastro;
