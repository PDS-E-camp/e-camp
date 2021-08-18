import styled from 'styled-components';

export const ContainerFooter = styled.footer`
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.primary} !important;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
  }
`;
