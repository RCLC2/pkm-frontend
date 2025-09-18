import styled from 'styled-components';


export const Header = styled.div`
  position: fixed;

  display: flex;
  @media (min-width: 768px) {
    flex-direction: ${({isScroll}) => isScroll ? "column": "row"};
    justify-content: ${({isScroll}) => isScroll ? "flex-start": "space-between"};

  }
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5em;
  
  /* width: 70%; */

  width: ${({isScroll}) => isScroll ? "10%": "70%"};
  left: ${({isScroll}) => isScroll ? "85%": "15%"};

  backdrop-filter: blur(20px);
  background-color: rgba(50,50,50,0.2);

  border-radius: 20em;
  box-shadow: 0 8px 20px #6a6a6a;

  transition: all ease 0.3s;  

  z-index: 1000;
  padding: 0 2em;

  color: white;
  text-shadow: 0 0 5px #eee;

  overflow-y: hidden;

  animation: movedown 1s forwards;

  @keyframes movedown {
    from{
      top: -30em;
    }
    to{
      top: 3em;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    left: 5%;
  }

  ${({isScroll}) => isScroll? (
    `
      @media (min-width: 768px) {
        border-radius: 3em;
        
        &:hover{
          height: 13em;
        }
      }
    `
  ) : ``    
  }

`;

export const HeaderTitleWrapper = styled.div`
  min-height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.h2`
  margin:0;
`;

export const HeaderTools = styled.div`
  display: flex;
  @media (min-width: 768px) {
    flex-direction:  ${({isScroll}) => isScroll ? "column": "row"};;
  }
  flex-direction:  row;
  justify-content: center;
  align-items: center;

  padding:0;
`;

export const HeaderTool = styled.h4`
  margin: 0 1em;
  transition: all ease 0.3s; 
  height: 3em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover{
    cursor: pointer;
    text-decoration: underline;
    transform: scale(1.1);
  }
`;