import React from 'react';

import { ContainerNavbar } from './styles';

function Navbar() {

  const id_usuario = window.localStorage.getItem('id_usuario')

  const sair = () =>{
    window.localStorage.clear()
    window.location.href = '/'
  }

  return (
    <ContainerNavbar>
      <header className='content-navbar'>
        <h1 onClick={() => (window.location.href = '/')}>E-camp</h1>

        <div className='buttons'>
        {id_usuario && <button onClick={() => (window.location.href = '/cadastrotorneio')}>
            <a>CRIAR TORNEIO</a>
          </button>}
          {id_usuario && <button onClick={() => (window.location.href = '/perfil')}>
            <a>PERFIL</a>
          </button>}
          {id_usuario && <button onClick={() => (window.location.href = '/admin')}>
            <a>ADMIN</a>
          </button>}
          {!id_usuario && <button onClick={() => (window.location.href = '/login')}>
            <a>LOGIN</a>
          </button>}
          {id_usuario && <button onClick={sair}>
            <a>SAIR</a>
          </button>}
          {!id_usuario && <button className='cadastro'>
            <a onClick={() => (window.location.href = '/cadastro')}>CADASTRO</a>
          </button>}
        </div>
      </header>
    </ContainerNavbar>
  );
}

export default Navbar;
