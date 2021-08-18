import styled from 'styled-components';

export const ContainerTitle = styled.div`
  h1 {
    font-size: 48px;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    font-family: 'Oswald', sans-serif;
    margin-top: 60px !important;
    .separador {
      width: 100%;
      height: 3px;
      background: ${({ theme }) => theme.black};
    }
  }
`;
