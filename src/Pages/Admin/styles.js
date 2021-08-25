import styled from 'styled-components';

export const ContainerJogo = styled.div`
  img {
    max-width: 100%;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  display: flex;
  flex-direction: column;
  .content-jogo {
    min-height: 125vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 120px !important;
  }
  .capa {
    width: 1440px;
    height: 430px;
    background: url(${(props) => props.capa});
    background-size: cover;
    background-position: center;
  }
  .content {
    width: 1440px;
    padding: 30px 70px !important;
    .comentarios {
      width: 100%;
      margin-top: 80px !important;
      .nome,
      .texto {
        font-size: 18px;
        font-weight: bold;
        font-family: 'Oswald', sans-serif;
      }
      .nome {
        color: ${({ theme }) => theme.primary};
      }
      .texto {
        margin-top: 10px !important;
        margin-bottom: 30px !important;
        color: ${({ theme }) => theme.black};
      }
    }
  }
  .times {
    margin-top: 60px;
    color: ${({ theme }) => theme.black};
    font-size: 28px;
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 30px;
  }
  .coordenador {
    font-weight: bold;
    font-size: 48px;
    font-family: 'Oswald', sans-serif;
    color: ${({ theme }) => theme.primary};
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .encerrar {
    color: ${({ theme }) => theme.black};
    cursor: pointer;
    font-size: 36px;
    :hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  .aba {
    background: ${({ theme }) => theme.primary};
    padding: 10px 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .timeName {
    font-size: 28px;
    color: ${({ theme }) => theme.white};
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Oswald', sans-serif;
  }
  .excluirEquipe {
    cursor: pointer;
    font-size: 18px;
    font-family: 'Oswald', sans-serif;
    color: ${({ theme }) => theme.white};
    :hover {
      text-decoration: underline;
    }
  }
  .jogadores {
    height: 0;
    border: none;
    transition: height 1s, border 0s;
    transition-delay: border 1s;
    .jogador {
      opacity: 0;
      transition: opacity 0s;
    }
    pointer-events: none;
  }
  .jogadoresOpened {
    display: flex;
    flex-direction: column;
    transition: height 1s, border 0s;
    border: 2px solid ${({ theme }) => theme.primary};
    height: 275px;
    opacity: 1;
    .jogador {
      opacity: 1;
      transition: opacity 1s 0.5s;
    }
    pointer-events: initial;
  }
  .jogador {
    padding: 10px 30px;
    font-size: 22px;
    font-family: 'Oswald', sans-serif;
    color: ${({ theme }) => theme.black};
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 2px solid ${({ theme }) => theme.grey};
    :last-child {
      border: none;
    }
    > div {
      display: flex;
      p {
        margin: 0rem 0.5rem;
        font-size: 18px;
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
        :hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
