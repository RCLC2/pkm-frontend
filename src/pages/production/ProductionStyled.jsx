import styled from 'styled-components';


export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: #1b1b1b;

  overflow-x: hidden;
  overflow-y: auto;
`;

export const Content = styled.div`
  width: 100%;
  min-height: 100%;

  display: flex;
  justify-content:flex-start;
  align-items: center;
  flex-direction: column;
`;



export const TitleWrapper = styled.div`
  position: absolute;
  z-index: 901;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  /* backdrop-filter: blur(10px); */

  opacity: 0;

  animation: opacity 1s forwards;

  @keyframes opacity {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`

export const Title = styled.h1`
  font-size: 10rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;

  text-shadow: 0 0 10px #eee;
`;

export const Subtitle = styled.p`
  font-size: 2em;
  color: #d1d5db;
  margin: 0;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;


  img{
    width: 100%;
    border-radius: 0.5rem;
  }
  canvas{
    width: 50%;

    aspect-ratio: 1 / 1;
  }

  z-index: 900;
`;

export const Section = styled.div`
  width: 100%;
  height: 100vh;

  display:flex;
  justify-content:center;
  align-items: center;
  
  position: relative; 
`;


export const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;

  margin-top: 5em;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  background: rgba(153, 153, 153, 0.6);
  /* backdrop-filter: blur(8px); */

  box-shadow: 0 0 3px #eee;

  span {
    color: white;
    font-size: 1rem;
    font-weight: 500;
  }

  transition: all ease 0.3s;

  &:hover{
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 0 3px #adadad;
  }
`;