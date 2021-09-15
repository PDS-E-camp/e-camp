import styled from "styled-components";

export const ContainerNavbar = styled.div`
  background: ${({ theme }) => theme.black};
  display: flex;
  justify-content: center;
  height: 50px;
  .content-navbar {
    width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1450px) {
      width: 90vw;
    }
    h1 {
      font-family: "Press Start 2P", cursive;
      font-size: 36px;
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
    }
    .buttons {
      display: flex;
      button {
        background: none;
        height: 100%;
        height: 50px;
        border: none;
        width: 110px;
      }
    }
    a {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-family: "Oswald", sans-serif;
      color: ${({ theme }) => theme.white};
      :hover {
        color: ${({ theme }) => theme.primary};
      }
      cursor: pointer;
    }
    .cadastro {
      background: ${({ theme }) => theme.primary} !important;
      a:hover {
        color: ${({ theme }) => theme.black};
      }
    }
  }
  form {
    margin-right: 6rem;
    height: 30px;
    display: flex;
    align-items: center;
    align-self: center;

    input {
      height: 30px;
      font-family: "Oswald", sans-serif;
      padding: 0 0.5rem;
      font-size: 1rem;
    }
    button {
      margin-left: 1rem;
      background: ${({ theme }) => theme.primary} !important;
      height: 32px !important;
      box-sizing: border-box;
      border: none;
      font-family: "Oswald", sans-serif;
      font-weight: bold;
      font-size: 1rem;
      color: ${({ theme }) => theme.white};
      :hover {
        border: 2px solid ${({ theme }) => theme.primary} !important;
        cursor: pointer;
        background: ${({ theme }) => theme.white} !important;
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;
