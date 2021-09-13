import React, { useEffect, useState } from 'react';

import { ContainerCadastro } from './styles';
import { GrNext } from 'react-icons/gr';
import Axios from 'axios';
//componentes
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

function Cadastro() {
  const [form, setForm] = useState({
    imagem: '',
    nome: '',
    etapas: '',
    descricao: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    const id_usuario = window.localStorage.getItem('id_usuario')
    if (!form.nome || !form.imagem || !form.etapas || !form.descricao){
      alert('Há campos não preenchidos, preencha o cadastro corretamente.');
    }else{
    Axios.post("http://localhost:3001/cadastrotorneio", {
      link: form.imagem,
      nome_torneio: form.nome,
      qt_etapas: form.etapas,
      descricao: form.descricao,
      fk_id_usuario: id_usuario,
    }).then((response) => {
      alert(response.data.msg);
      window.location.href = '/perfil'
    })}
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
              id='etapas'
              value={form.etapas}
              onChange={handleChange}
              placeholder='Número de etapas'
            />
            <input
              type='text'
              id='descricao'
              value={form.descricao}
              onChange={handleChange}
              placeholder='Descrição'
            />          
            {/* <button onClick={handleSubmit}>
              <GrNext />
            </button> */}
            <button className='finalizar' onClick={handleSubmit}>FINALIZAR</button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Cadastro;
