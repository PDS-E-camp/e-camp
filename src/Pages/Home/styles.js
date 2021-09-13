import styled from "styled-components";

export const ContainerHome = styled.div`
  img {
    max-width: 100% !important;
    box-sizing: border-box;
  }
  .content-home {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 120px !important;
    .slide {
      margin-top: 60px !important;
      display: flex;
      justify-content: flex-start;
      width: 1440px;
      flex-wrap: wrap;
    }
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
    width: 258px;
    background: rgba(0, 0, 0, 0.8);
    padding-left: 10px;
  }
  :hover {
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`;
