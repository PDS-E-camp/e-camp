import React, { useEffect, useState } from 'react';

import { ContainerCadastro } from './styles';

//componentes
import Navbar from '../../Components/Navbar';
import ff from '../../assets/images/ff.png';
import FIFA from '../../assets/images/fifa.png';
import lol from '../../assets/images/lol.png';
import capaFf from '../../assets/images/capa-ff.png';
import capaLol from '../../assets/images/capa-lol.png';
import capaFifa from '../../assets/images/capa-fifa.png';
import Footer from '../../Components/Footer';

function Cadastro() {
  const [form, setForm] = useState({
    email: '',
    senha: '',
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (
      window.localStorage.getItem('emailCadastro') === form.email &&
      window.localStorage.getItem('senhaCadastro') === form.senha
    ) {
      window.localStorage.setItem('emailLogin', form.email);
      window.localStorage.setItem('senhaLogin', form.senha);
      window.localStorage.setItem(
        'nomeLogin',
        window.localStorage.getItem('nomeCadastro')
      );
      alert('Login realizado com sucesso!');
      window.location.href = '/';
    } else {
      alert('Login incorreto!');
    }
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
              type='email'
              id='email'
              value={form.email}
              onChange={handleChange}
              placeholder='email'
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
