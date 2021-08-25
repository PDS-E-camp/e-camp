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

function Admin() {
  const [jogo, setJogo] = useState();
  const id = window.localStorage.getItem('jogoID');
  const [timeOpened, setTimeOpened] = useState('');
  const [times, setTimes] = useState([
    {
      id: '0',
      time: 'Santos',
      jogadores: [
        {
          id: '0',
          nome: 'Nicole',
        },
        {
          id: '1',
          nome: 'Melissa',
        },
        {
          id: '2',
          nome: 'Lorena',
        },
        {
          id: '3',
          nome: 'Carol',
        },
        {
          id: '4',
          nome: 'Cauã',
        },
      ],
    },
    {
      id: '1',
      time: 'flamengo',
      jogadores: [
        {
          id: '5',
          nome: 'Melissa',
        },
        {
          id: '6',
          nome: 'Lívia',
        },
        {
          id: '7',
          nome: 'Joana',
        },
        {
          id: '8',
          nome: 'Levi',
        },
        {
          id: '9',
          nome: 'Renato',
        },
      ],
    },
    {
      id: '2',
      time: 'Vasco',
      jogadores: [
        {
          id: '10',
          nome: 'Maria Fernanda',
        },
        {
          id: '11',
          nome: 'Angelina',
        },
        {
          id: '12',
          nome: 'Davi',
        },
        {
          id: '13',
          nome: 'Guilherme',
        },
        {
          id: '14',
          nome: 'Manuel',
        },
      ],
    },
    {
      id: '3',
      time: 'Palmeiras',
      jogadores: [
        {
          id: '15',
          nome: 'Heloísa',
        },
        {
          id: '16',
          nome: 'Fernanda',
        },
        {
          id: '17',
          nome: 'Heitor',
        },
        {
          id: '18',
          nome: 'Emanuel',
        },
        {
          id: '19',
          nome: 'Wilian',
        },
      ],
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

  function handleClick(id) {
    if (timeOpened === id) {
      setTimeOpened('');
    } else {
      setTimeOpened(id);
    }
  }

  function excluirBanir(time, jogador, tipo) {
    // const newTimes = times;
    // const indiceTime = newTimes.indexOf(time);
    // const indiceJogador = newTimes[indiceTime].jogadores.indexOf(jogador);
    // newTimes[indiceTime].jogadores.splice(indiceJogador, 1);
    // console.log(newTimes);
    // setTimes(newTimes);

    const indiceTime = times.indexOf(time);
    const indiceJogador = times[indiceTime].jogadores.indexOf(jogador);
    times[indiceTime].jogadores.splice(indiceJogador, 1);
    setTimes(times);
  }

  return (
    <ContainerJogo capa={jogo && jogo.capa}>
      <Navbar />
      <section className='content-jogo'>
        <div className='capa' />
        <div className='content'>
          <div className='coordenador'>
            <p>COORDENADOR</p>
            <p className='encerrar'>Encerrar</p>
          </div>
          <p className='times'>Times</p>
          {times &&
            times.map((time) => {
              return (
                <>
                  <div
                    key={time.id}
                    className='aba'
                    onClick={() => handleClick(time.id)}
                  >
                    <p className='timeName'>{time.time}</p>
                    <p className='excluirEquipe'>Excluir equipe</p>
                  </div>
                  <div
                    className={`jogadores ${
                      timeOpened === time.id && 'jogadoresOpened'
                    }`}
                  >
                    {time.jogadores.map((jogador) => {
                      return (
                        <div key={jogador.id} className='jogador'>
                          <p>{jogador.nome}</p>
                          <div>
                            <p
                              onClick={() =>
                                excluirBanir(time, jogador, 'excluir')
                              }
                            >
                              Excluir usuário
                            </p>
                            <p
                              onClick={() =>
                                excluirBanir(time, jogador, 'banir')
                              }
                            >
                              Banir usuário
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
        </div>
      </section>
      <Footer />
    </ContainerJogo>
  );
}

export default Admin;
