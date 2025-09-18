import * as S from "./ProductionTopbarStyled";
import { useNavigate } from 'react-router-dom';


const Topbar = ({isScrolled}) => {

 const navigate = useNavigate();

 return (
  <S.Header isScroll={isScrolled}>
    <S.HeaderTitleWrapper>
      <S.HeaderTitle>Projcet</S.HeaderTitle>
    </S.HeaderTitleWrapper>
    
    <S.HeaderTools isScroll={isScrolled}>
      <S.HeaderTool onClick={() => navigate('/docs')}>docs</S.HeaderTool>
      <S.HeaderTool onClick={() => navigate('/login')}>login</S.HeaderTool>
    </S.HeaderTools>
  </S.Header>
 )
}
export default Topbar;