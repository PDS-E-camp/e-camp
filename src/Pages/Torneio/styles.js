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
      .partida {
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
        :hover {
          transform: scale(1.1);
        }
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
  width: 268px;
  height: 350px;
  background: url(${(props) => props.item});
  background-size: cover;
  background-position: center;
  position: relative;
  box-sizing: border-box;
  margin: 0 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  h2 {
    color: ${({ theme }) => theme.primary};
    font-family: "Oswald", sans-serif;
    font-size: 36px;
    margin: 0%;
    width: 268px;
    background: rgba(0, 0, 0, 0.8);
    padding-left: 10px;
  }
  :hover {
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`;