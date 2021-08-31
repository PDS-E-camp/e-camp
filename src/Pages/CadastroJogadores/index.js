import React, { useEffect, useState } from 'react';

import { ContainerCadastro } from './styles';
import { GrNext } from 'react-icons/gr';

//componentes
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

function Cadastro() {
  const [nTimes, setNTimes] = useState([]);
  const [text, setText] = useState([]);
  const [nJogadores, setNJogadores] = useState([]);
  useEffect(() => {
    let torneio = localStorage.getItem('torneio');
    let torneioObj = JSON.parse(torneio);
    const arrayTimes = [];
    const arrayJogadores = [];
    if (torneioObj) {
      for (var i = 1; i <= torneioObj.numerodetimes; i++) {
        arrayTimes.push('');
      }
      for (var i = 1; i <= torneioObj.numerodejogadores; i++) {
        arrayJogadores.push('');
      }
      setNJogadores(arrayJogadores);
      setNTimes(arrayTimes);
    }
  }, []);
  const [form, setForm] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
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
          <form onSubmit={handleSubmit}>
            {nTimes.map((item, indexA) => {
              return (
                <>
                  <input
                    type='text'
                    id={`time${indexA + 1}`}
                    value={text[indexA]}
                    onChange={handleChange}
                    placeholder={`time ${indexA + 1}`}
                  />

                  {nJogadores.map((item, indexB) => {
                    return (
                      <input
                        className='jogadores'
                        type='text'
                        id={`jogador ${indexB + 1}${indexA + 1}`}
                        value={text[indexB]}
                        onChange={handleChange}
                        placeholder={`jogador ${indexB + 1}`}
                      />
                    );
                  })}
                </>
              );
            })}
            <div className='buttons'>
              <button
                onClick={() => (window.location.href = '/cadastrotorneio')}
              >
                <GrNext />
              </button>
              <button className='finalizar'>FINALIZAR</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </ContainerCadastro>
  );
}

export default Cadastro;
