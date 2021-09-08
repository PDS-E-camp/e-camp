import styled from "styled-components";

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
    padding: 30px;
    background: ${({ theme }) => theme.black};
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 48px;
      font-family: "Press Start 2P", cursive;
      color: ${({ theme }) => theme.primary};
      margin-bottom: 50px;
    }
    form {
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
        padding: 0 15px;
        background: white;
      }
      button {
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
        font-family: "Oswald", sans-serif;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        :hover {
          transform: scale(1.1);
        }
      }
    }
  }
`;
