import styled from 'styled-components';

export const ContainerCadastro = styled.div`
  img {
    max-width: 100%;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  .content-Cadastro {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 120px 0 !important;
  }
  .modal {
    width: 1024px;
    height: auto;
    padding: 40px;
    background: ${({ theme }) => theme.black};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .capa {
      width: 550px;
      height: 200px;
      background: url(${(props) => props.linkCapa});
      background-size: cover;
      background-position: center;
      margin-bottom: 30px;
    }
    .capa-default {
      background-color: ${({ theme }) => theme.primary};
      position: relative;
      ::after {
        position: absolute;
        content: 'Prévia da Capa';
        width: 100%;
        top: 0;
        left: 0;
        height: 100%;
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Oswald', sans-serif;
      }
    }
    h1 {
      font-size: 48px;
      font-family: 'Press Start 2P', cursive;
      color: ${({ theme }) => theme.primary};
      margin-bottom: 50px;
    }
    form {
      .jogadores {
        width: 80%;
        align-self: center;
      }
      display: flex;
      flex-direction: column;
      input,
      select {
        width: 550px;
        height: 40px;
        border: none;
        margin-bottom: 30px !important;
        padding: 15px;
      }
      select {
        padding: 10px;
      }
      .buttons {
        display: flex;
        justify-content: center;
      }
      button {
        width: 40px;
        height: 40px;
        background: ${({ theme }) => theme.primary};
        cursor: pointer;
        transform: scale(1.05);
        border-radius: 50%;
        align-self: center;
        border: none;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        margin-right: 1rem;
        transform: rotate(180deg);
        svg {
          width: 1.5rem;
          height: 1.5rem;
          polyline {
            stroke: #fff !important;
          }
        }
        :hover {
          transform: scale(1.1) rotate(180deg);
        }
      }
      .finalizar {
        width: 150px;
        height: 40px;
        background: ${({ theme }) => theme.primary};
        cursor: pointer;
        transform: scale(1.05);
        color: ${({ theme }) => theme.white};
        border-radius: 5px;
        align-self: center;
        border: none;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        font-family: 'Oswald', sans-serif;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        :hover {
          transform: scale(1.1);
        }
      }
    }
  }
`;
