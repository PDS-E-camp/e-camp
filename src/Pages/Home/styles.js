import styled from 'styled-components';

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
      width: 1440px;
      height: 490px;
      margin-top: 60px !important;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      display: block;
    }
  }
`;
export const Thumb = styled.div`
  display: inline-block;
  width: 365px;
  height: 490px;
  background: url(${(props) => props.item});
  background-size: cover;
  background-position: center;
  position: relative;
  box-sizing: border-box;
  .thumb-content {
    flex-direction: column;
    background: rgba(225, 87, 31, 0.8);
    width: 100% !important;
    height: 490px;
    padding: 30px !important;
    color: white;
    box-sizing: border-box;
    h2 {
      font-size: 36px;
      font-weight: bold;
      font-family: 'Oswald', sans-serif;
      width: 100% !important;
    }
    h1 {
      font-size: 48px;
      font-weight: bold;
      font-family: 'Oswald', sans-serif;
      margin: 115px 0 !important;
      width: 100% !important;
    }
    p {
      font-size: 18px;
      font-weight: bold;
      font-family: 'Oswald', sans-serif;
      width: 100% !important;
    }
    position: absolute;
    top: 30px;
    opacity: 0;
    transition: all 0.2s;
  }
  :hover {
    cursor: pointer;
    .thumb-content {
      opacity: 1;
      top: 0;
    }
  }
`;
