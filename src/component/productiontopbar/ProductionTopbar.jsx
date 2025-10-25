import * as S from "./ProductionTopbarStyled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/auth/useLogout";

const Topbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState(false);
  const logoutMutation = useLogout();

  // 원래는 전역 상태로 관리하지만 지금은 간단히 쿠키로 확인
  useEffect(() => {
    const hasToken = document.cookie.includes("accessToken");
    setHasToken(hasToken);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
    setTimeout(() => {
      // setHasToken(false);
    }, 500);
  };

  return (
    <S.Header isScroll={isScrolled}>
      <S.HeaderTitleWrapper>
        <S.HeaderTitle>Projcet</S.HeaderTitle>
      </S.HeaderTitleWrapper>

      <S.HeaderTools isScroll={isScrolled}>
        <S.HeaderTool onClick={() => navigate("/docs")}>docs</S.HeaderTool>
        {hasToken ? (
          <S.HeaderTool onClick={handleLogout}>logout</S.HeaderTool>
        ) : (
          <S.HeaderTool onClick={() => navigate("/login")}>login</S.HeaderTool>
        )}
      </S.HeaderTools>
    </S.Header>
  );
};
export default Topbar;
