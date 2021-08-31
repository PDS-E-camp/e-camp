import styled from 'styled-components';

export const ContainerPerfil = styled.div`
  img {
    max-width: 100%;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  .content-perfil {
    min-height: 125vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 120px !important;
  }
  .content {
    width: 1440px;
    padding: 30px 70px !important;
  }
  .data {
    display: flex;
    h1 {
      margin-top: 1rem;
      font-family: 'Press Start 2P', cursive;
      color: ${({ theme }) => theme.primary};
    }
    p {
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
      margin-top: 1rem;
    }
    .informacoes {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        color: ${({ theme }) => theme.primary};
        font-weight: bolder;
      }
    }
  }
  .foto-perfil {
    background: url('https://http2.mlstatic.com/D_NQ_NP_614041-MLB27185740295_042018-O.jpg')
      no-repeat;
    margin-right: 1rem;
    background-position: center;
    background-size: cover;
    width: 200px;
    box-sizing: border-box;
    height: 300px;
    border: 4px solid ${({ theme }) => theme.primary};
  }
  .section-ger-part {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }) => theme.black};
    margin-top: 30px;
  }
  .gerencio {
    h1 {
      margin-bottom: 1.5rem;
      font-family: 'Press Start 2P', cursive;
      color: ${({ theme }) => theme.primary};
    }

    width: 1440px;
    padding: 30px 70px !important;
  }

  .participo {
    background: white;
  }

  .section-card {
    display: flex;
    flex-wrap: wrap;
  }
`;
export const Card = styled.div`
  img {
    max-width: 100%;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  margin-right: 30px;
  .cover {
    background: url(${(props) => props.image}) no-repeat;
    margin-right: 1rem;
    background-position: center;
    background-size: cover;
    width: 200px;
    box-sizing: border-box;
    height: 300px;
    border: 4px solid ${({ theme }) => theme.white};
  }
  cursor: pointer;
  transition: all 0.3s;
  :hover {
    transform: scale(1.1);
  }
  p {
    font-family: 'Oswald', sans-serif;
    font-size: 20px;
    font-weight: bolder;
    color: ${({ theme }) => theme.primary};
  }
`;
