import React, { useEffect, useState } from 'react';

import { ContainerCadastro } from './styles';
import { GrNext } from 'react-icons/gr';

//componentes
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

function Cadastro() {
  const [form, setForm] = useState({
    imagem: '',
    nome: '',
    numerodetimes: '',
    numerodejogadores: '',
    tipodetorneio: '',
    timesporpartida: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('torneio', JSON.stringify(form));
    window.location.href = '/cadastrojogadores';
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
    console.log({ ...form, [id]: value });
  }

  return (
    <ContainerCadastro linkCapa={form.imagem}>
      <Navbar />
      <section className='content-Cadastro'>
        <div className='modal'>
          <h1>Cadastrar Torneio</h1>
          <div className={`capa ${!form.imagem && 'capa-default'}`} />
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              id='imagem'
              value={form.imagem}
              onChange={handleChange}
              placeholder='Link da capa'
            />
            <input
              type='text'
              id='nome'
              value={form.nome}
              onChange={handleChange}
              placeholder='Nome'
            />
            <input
              type='number'
              id='numerodetimes'
              value={form.numerodetimes}
              onChange={handleChange}
              placeholder='Número de times'
            />
            <input
              type='number'
              id='numerodejogadores'
              value={form.numerodejogadores}
              onChange={handleChange}
              placeholder='Número de jogadores'
            />
            <select
              id='tipodetorneio'
              value={form.tipodetorneio}
              onChange={handleChange}
            >
              <option value='pontuacao'>Pontuação</option>
              <option value='eliminatoria'>Eliminatória</option>
            </select>
            <input
              type='number'
              id='timesporpartida'
              value={form.timesporpartida}
              onChange={handleChange}
              placeholder='timesporpartida'
            />
            <button onClick={handleSubmit}>
              <GrNext />
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Cadastro;
