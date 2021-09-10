import React, { useEffect, useState } from "react";
import { ContainerCadastro } from "./styles";
//componentes
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    if(!form.email || !form.senha){
      alert('Há campos não preenchidos, preencha o login corretamente.');
    }else{
      Axios.post("http://localhost:3001/login", {
        email: form.email,
        senha: form.senha,
      }).then((response) => {
          alert(response.data.msg);
          if(response.data.msg ===  "Usuário logado!"){
            const id_usuario = response.data.result[0].id_usuario
            window.localStorage.setItem('id_usuario', id_usuario)
            window.location.href = '/perfil';
          }
        }
      )
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
            <button>ENTRAR</button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Login;
