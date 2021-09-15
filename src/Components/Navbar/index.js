import React from "react";

import { ContainerNavbar } from "./styles";

function Navbar() {
  const id_usuario = window.localStorage.getItem("id_usuario");

  const sair = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  const [form, setForm] = React.useState({
    busca: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem("id_busca", form.busca);
    window.location.href = "/busca";
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  return (
    <ContainerNavbar>
      <header className="content-navbar">
        <h1 onClick={() => (window.location.href = "/")}>E-camp</h1>

        <div className="buttons">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="busca"
              value={form.busca}
              onChange={handleChange}
              placeholder="Buscar partida por ID"
            />
            <button>BUSCAR</button>
          </form>
          {id_usuario && (
            <button onClick={() => (window.location.href = "/cadastrotorneio")}>
              <a>CRIAR TORNEIO</a>
            </button>
          )}
          {id_usuario && (
            <button onClick={() => (window.location.href = "/perfil")}>
              <a>PERFIL</a>
            </button>
          )}
          {!id_usuario && (
            <button onClick={() => (window.location.href = "/login")}>
              <a>LOGIN</a>
            </button>
          )}
          {id_usuario && (
            <button onClick={sair}>
              <a>SAIR</a>
            </button>
          )}
          {!id_usuario && (
            <button className="cadastro">
              <a onClick={() => (window.location.href = "/cadastro")}>
                CADASTRO
              </a>
            </button>
          )}
        </div>
      </header>
    </ContainerNavbar>
  );
}

export default Navbar;
