import React from 'react';

import { ContainerNavbar } from './styles';

function Navbar() {
  return (
    <ContainerNavbar>
      <header className='content-navbar'>
        <h1 onClick={() => (window.location.href = '/')}>E-camp</h1>

        <div className='buttons'>
          <button onClick={() => (window.location.href = '/cadastrotorneio')}>
            <a>CRIAR TORNEIO</a>
          </button>
          <button onClick={() => (window.location.href = '/perfil')}>
            <a>PERFIL</a>
          </button>
          <button onClick={() => (window.location.href = '/admin')}>
            <a>ADMIN</a>
          </button>
          <button onClick={() => (window.location.href = '/login')}>
            <a>LOGIN</a>
          </button>
          <button className='cadastro'>
            <a onClick={() => (window.location.href = '/cadastro')}>CADASTRO</a>
          </button>
        </div>
      </header>
    </ContainerNavbar>
  );
}

export default Navbar;
