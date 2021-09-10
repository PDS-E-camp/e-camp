import React, { useEffect, useState } from 'react';

import { ContainerJogo, Thumb } from './styles';

//componentes
import Navbar from '../../Components/Navbar';

import Footer from '../../Components/Footer';
import Axios from 'axios';

function Torneio() {
  const [name, setName] = useState('');
  const [textArea, setTextArea] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const [torneioAtual, setTorneioAtual] = useState({});

  function getComentarios(){
    const id_torneio = window.localStorage.getItem('id_torneio')
    Axios.get(`http://localhost:3001/torneio/${id_torneio}`
      )
    .then((response) => {
      console.log(response)
      setComentarios(response.data.result)
      
      }
    )
  }

  useEffect(()=>{
    const id_usuario = window.localStorage.getItem('id_usuario')
    const id_torneio = window.localStorage.getItem('id_torneio')
    function init() {
      Axios.get(`http://localhost:3001/perfil/${id_usuario}`
        )
      .then((response) => {
        setName(response.data[0][0].username)
          response.data[1].map((item)=>{
            if(item.id_torneio.toString() === id_torneio){
              setTorneioAtual(item)
              
            }
          })
        }
      )
    }
    init()
    getComentarios()
  },[])

  

  function handleSubmit(event) {
    event.preventDefault();
    const id_usuario = window.localStorage.getItem('id_usuario')
    const id_torneio = window.localStorage.getItem('id_torneio')
    if(!textArea){
      alert('Preencha o comentário corretamente.');
    }else{
      Axios.post("http://localhost:3001/torneio", {
        comentario: textArea,
        id_usuario: id_usuario,
        fk_id_torneio: id_torneio
      }).then((response) => {
          getComentarios()
          setTextArea('');
        }
      )
    }
  }

  return (
    <ContainerJogo capa={torneioAtual.link}>
      <Navbar />
      <section className='content-jogo'>
        <div className='capa' />
        <div className='content'>
          <p className='rodada'>{torneioAtual.nome_torneio}</p>
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
                    <p className='nome'>{item.username}</p>
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

export default Torneio;
