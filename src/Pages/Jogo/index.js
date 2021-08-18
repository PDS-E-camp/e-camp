import React, { useEffect, useState } from 'react';

import { ContainerJogo, Thumb } from './styles';

//componentes
import Navbar from '../../Components/Navbar';
import ff from '../../assets/images/ff.png';
import FIFA from '../../assets/images/fifa.png';
import lol from '../../assets/images/lol.png';
import capaFf from '../../assets/images/capa-ff.png';
import capaLol from '../../assets/images/capa-lol.png';
import capaFifa from '../../assets/images/capa-fifa.png';
import Footer from '../../Components/Footer';

function Jogo() {
  const [jogo, setJogo] = useState();
  const id = window.localStorage.getItem('jogoID');
  const name = window.localStorage.getItem('nomeLogin');
  const [textArea, setTextArea] = useState('');

  const [comentarios, setComentarios] = useState([
    {
      name: 'Kaio',
      comentario: 'Jogo ta top!',
    },
    {
      name: 'Rodolfo',
      comentario: 'Vamoos ganharrr!!!',
    },
  ]);

  const torneios = [
    {
      id: 1,
      nome: 'Copa LOL',
      premio: '5 mil reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: lol,
      capa: capaLol,
      rodada: 10,
    },
    {
      id: 2,
      nome: 'Copa FF',
      premio: '1 mil reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 8,
    },
    {
      id: 3,
      nome: 'Copa FIFA',
      premio: '2 mil reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: FIFA,
      capa: capaFifa,
      rodada: 6,
    },
    {
      id: 4,
      nome: 'Copa LOLzin',
      premio: '2 mil reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: lol,
      capa: capaLol,
      rodada: 7,
    },
    {
      id: 5,
      nome: 'Copa FFzin',
      premio: '500 reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 2,
    },
    {
      id: 6,
      nome: 'Copa FIFinha',
      premio: '3 mil reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: FIFA,
      capa: capaFifa,
      rodada: 1,
    },
    {
      id: 7,
      nome: 'Copa 3X',
      premio: '2500 reais',
      dataI: new Date('May 17, 2021 03:24:00'),
      dataF: new Date(),
      thumb: ff,
      capa: capaFf,
      rodada: 4,
    },
  ];

  useEffect(() => {
    const jogoAtual = torneios.filter((item) => {
      return item.id == id && item;
    });
    setJogo(jogoAtual[0]);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const comentUpdate = [...comentarios, { name, comentario: textArea }];
    setComentarios(comentUpdate);
    setTextArea('');
  }

  return (
    <ContainerJogo capa={jogo && jogo.capa}>
      <Navbar />
      <section className='content-jogo'>
        <div className='capa' />
        <div className='content'>
          <p className='rodada'>Rodada {jogo && jogo.rodada}</p>
          <form onSubmit={handleSubmit}>
            <label>Comentários</label>
            <textarea
              id='textarea'
              value={textArea}
              onChange={(event) => setTextArea(event.target.value)}
              placeholder='Digique aqui o seu comentário'
            />
            <button disabled={!name || !textArea}>ENVIAR</button>
          </form>
          <div className='comentarios'>
            {comentarios
              .map((item) => {
                return (
                  <>
                    <p className='nome'>{item.name}</p>
                    <p className='texto'>{item.comentario}</p>
                  </>
                );
              })
              .reverse()}
          </div>
        </div>
      </section>
      <Footer />
    </ContainerJogo>
  );
}

export default Jogo;
