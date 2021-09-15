import styled from "styled-components";

export const ContainerJogo = styled.div`
  img {
    max-width: 100%;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
  .content-jogo {
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
        font-family: "Oswald", sans-serif;
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
    .descricao {
      color: ${({ theme }) => theme.black};
      font-size: 20px;
      font-weight: bold;
      font-family: "Oswald", sans-serif;
    }
    .titulo-button {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      .partida,
      .acompanhar {
        width: 150px;
        height: 40px;
        background: ${({ theme }) => theme.primary};
        cursor: pointer;
        transform: scale(1.05);
        color: ${({ theme }) => theme.white};
        border-radius: 5px;
        border: none;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        font-family: "Oswald", sans-serif;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        margin-left: 4rem;
        :hover {
          transform: scale(1.1);
        }
      }
      .acompanhar {
        height: auto;
        /* padding: 1rem; */
        margin-top: 1rem;
      }
    }

    form {
      margin-top: 60px !important;
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        color: ${({ theme }) => theme.black};
        font-size: 18px;
        font-weight: bold;
        font-family: "Oswald", sans-serif;
      }
      textarea {
        color: ${({ theme }) => theme.black};
        /* font-weight: bold; */
        font-size: 18px;
        height: 64px;
        padding: 20px !important;
        border: none;
        border-bottom: 2px solid ${({ theme }) => theme.grey};
        margin-top: 10px !important;
        :focus {
          border: none;
        }
        ::placeholder {
          color: ${({ theme }) => theme.grey};
        }
      }
      button {
        width: 150px;
        height: 40px;
        background: ${({ theme }) => theme.primary};
        cursor: pointer;
        transform: scale(1.05);
        color: ${({ theme }) => theme.white};
        border-radius: 5px;
        border: none;
        margin-top: 1rem !important;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        font-family: "Oswald", sans-serif;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        :hover {
          transform: scale(1.1);
        }
        :disabled {
          opacity: 0.5;
        }
      }
    }
  }
  .rodada {
    font-weight: bold;
    font-size: 48px;
    font-family: "Oswald", sans-serif;
    color: ${({ theme }) => theme.primary};
  }
  .slide {
    margin-top: 60px !important;
    display: flex;
    justify-content: flex-start;
    width: 1440px;
    flex-wrap: wrap;
  }
`;
export const Thumb = styled.div`
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  margin-right: 15px;
  border-radius: 10px;
  background: none;

  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 36px;
    margin: 0%;
    padding-left: 10px;
    border-radius: 10px;
    color: ${({ theme }) => theme.primary};
  }
  :hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.primary};
    h2 {
      background: ${({ theme }) => theme.primary};
      color: white;
    }
  }
`;
