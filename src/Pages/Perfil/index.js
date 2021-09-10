import React, { useEffect, useState } from 'react';

import { ContainerPerfil, Card } from './styles';

//componentes
import Navbar from '../../Components/Navbar';
import ff from '../../assets/images/ff.png';
import FIFA from '../../assets/images/fifa.png';
import lol from '../../assets/images/lol.png';
import Footer from '../../Components/Footer';
import Axios from 'axios';

function Perfil() {
  
  const [perfil, setPerfil] = useState('')
  const [dataNasc, setDataNasc] = useState(new Date())

  const [arrayGerencio, setArrayGerencio] = useState([])
  const [arrayParticipo, setArrayParticipo] = useState([]);

  useEffect(()=>{
    const id_usuario = window.localStorage.getItem('id_usuario')
    function init() {
      Axios.get(`http://localhost:3001/perfil/${id_usuario}`
        )
      .then((response) => {
          setArrayGerencio(response.data[1])
          setArrayParticipo(response.data[1])
          console.log(response.data[1])
          setPerfil(response.data[0][0])
          const date = new Date(response.data[0][0].data_nasc)
          setDataNasc(date)
          
        }
      )
    }
    init()
  },[])


  return (
    <ContainerPerfil>
      <Navbar />
      <section className='content-perfil'>
        <div className='content'>
          <div className='data'>
            <div className='foto-perfil' />
            <div className='informacoes'>
              <div>
                <h1>{perfil.username}</h1>
                <p>{perfil.nome}</p>
                <p>{dataNasc.getDate()}/{dataNasc.getMonth() + 1}/{dataNasc.getFullYear()}</p>
                
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
              {arrayGerencio.map((item, index) => {
                return (
                  <Card key={index} image={item.link}>
                    <div className='cover' />
                    <p>{item.nome_torneio}</p>
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
              {arrayParticipo.map((item, index) => {
                return (
                  <Card key={index} image={item.link}>
                    <div className='cover' />
                    <p>{item.nome_torneio}</p>
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
