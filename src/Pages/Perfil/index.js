import React, { useEffect, useState } from 'react';

import { ContainerPerfil, Card } from './styles';

//componentes
import Navbar from '../../Components/Navbar';
import ff from '../../assets/images/ff.png';
import FIFA from '../../assets/images/fifa.png';
import lol from '../../assets/images/lol.png';
import capaFf from '../../assets/images/capa-ff.png';
import capaLol from '../../assets/images/capa-lol.png';
import capaFifa from '../../assets/images/capa-fifa.png';
import Footer from '../../Components/Footer';

function Perfil() {
  const arrayGerencio = [
    { title: 'lol', image: lol },
    { title: 'fifa', image: FIFA },
    { title: 'freefire', image: ff },
    { title: 'lolzin do bairro', image: lol },
  ];
  const arrayParticipo = [
    { title: 'lol', image: lol },
    { title: 'fifa', image: FIFA },
    { title: 'freefire', image: ff },
    { title: 'lolzin do bairro', image: lol },
    { title: 'freefirezin', image: ff },
    { title: 'fifa dos parças', image: FIFA },
  ];
  return (
    <ContainerPerfil>
      <Navbar />
      <section className='content-perfil'>
        <div className='content'>
          <div className='data'>
            <div className='foto-perfil' />
            <div className='informacoes'>
              <div>
                <h1>Marivaldo Fratura Exposta</h1>
                <p>marivaldoFE@gmail.com</p>
              </div>
              <div>
                <p>
                  Gerencia <span>4</span> Torneios
                </p>
                <p>
                  Participa de <span>6</span> Torneios
                </p>
              </div>
            </div>
          </div>
        </div>
        <section className='section-ger-part'>
          <div className='gerencio'>
            <h1>Camps que gerencio</h1>
            <div className='section-card'>
              {arrayGerencio.map((item) => {
                return (
                  <Card image={item.image}>
                    <div className='cover' />
                    <p>{item.title}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        <section className='section-ger-part participo'>
          <div className='gerencio'>
            <h1>Camps que participo</h1>
            <div className='section-card'>
              {arrayParticipo.map((item) => {
                return (
                  <Card image={item.image}>
                    <div className='cover' />
                    <p>{item.title}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </ContainerPerfil>
  );
}

export default Perfil;
