import styled from 'styled-components';

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
      font-family: 'Press Start 2P', cursive;
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
      font-family: 'Oswald', sans-serif;
      color: ${({ theme }) => theme.white};
      cursor: pointer;
    }
    .cadastro {
      background: ${({ theme }) => theme.primary} !important;
    }
  }
`;
