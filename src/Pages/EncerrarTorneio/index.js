import React, { useEffect, useState } from "react";
import { ContainerCadastro } from "./styles";
//componentes
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Axios from "axios";

function EncerrarTorneio() {
  const [form, setForm] = useState({
    resultado: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const id_torneio = window.localStorage.getItem("id_torneio");
    const encerrado = "sim";
    if (!form.resultado) {
      alert("Há campos não preenchidos, preencha o resultado corretamente.");
    } else {
      Axios.put("http://localhost:3001/torneio", {
        fk_id_torneio: id_torneio,
        resultado: form.resultado,
        encerrado: encerrado,
      }).then((response) => {
        alert(response.data.msg);
        window.location.href = '/'
      });
    }
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  return (
    <ContainerCadastro>
      <Navbar />
      <section className="content-Cadastro">
        <div className="modal">
          <h1>Encerrar Torneio</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="resultado"
              value={form.resultado}
              onChange={handleChange}
              placeholder="Resultado"
            />
            <button>ENCERRAR</button>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default EncerrarTorneio;
