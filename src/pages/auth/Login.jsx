/* eslint-disable no-unused-vars */
import * as S from "./styled/LoginStyled";
import React, { useState } from "react";
import { ArrowBigLeftDash } from "lucide-react";
import { useBeginGoogleLogin } from "../../hooks/auth/useGoogleAuth";

const LoginPage = () => {
  // 🔹 일반 로그인 (현재 비활성화)
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // TODO: 일반 로그인 로직 (추후 필요 시 활성화)
  // };

  // 🔹 Google 로그인 훅
  const beginGoogle = useBeginGoogleLogin();

  return (
    <S.LoginWrapper>
      <S.BackgroundGlow />
      <S.BackgroundGradient />
      <S.Content>
        {/* ===== 브랜드 소개 영역 ===== */}
        <S.BrandPanel>
          <S.BackLink to="/">
            <ArrowBigLeftDash size={18} />
            돌아가기
          </S.BackLink>
          <S.BrandHeading>
            영감을 다시 불러오고, 당신만의 지식을 정리하세요.
          </S.BrandHeading>
          <S.BrandCopy>
            H-Space는 창작자와 연구자에게 맞춤화된 워크스페이스를 제공해
            프로젝트를 빠르게 시작하고 완성할 수 있도록 도와드립니다.
          </S.BrandCopy>
          <S.FeatureList>
            <li>프로젝트별 맞춤 서가 테마 유지</li>
            <li>워크플로우에 맞춘 템플릿으로 바로 시작</li>
            <li>팀과 지식을 공유하며 발전시키기</li>
          </S.FeatureList>
        </S.BrandPanel>

        {/* ===== 로그인 섹션 ===== */}
        <S.FormSection>
          <S.FormHeader>
            <S.FormTitle>로그인</S.FormTitle>
            <S.FormSubtitle>
              계정에 접속해 당신의 책장을 계속 디자인하고 관리하세요.
            </S.FormSubtitle>
          </S.FormHeader>

          {/* ✅ 일반 로그인 (현재 주석 처리)
          <S.LoginForm onSubmit={handleLogin}>
            <S.Field>
              <S.FieldLabel htmlFor="LidInput">아이디</S.FieldLabel>
              <S.InputControl
                id="LidInput"
                type="text"
                required
                autoComplete="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </S.Field>
            <S.Field>
              <S.FieldLabel htmlFor="password">비밀번호</S.FieldLabel>
              <S.InputControl
                id="password"
                type="password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </S.Field>
            <S.Actions>
              <S.LoginButton type="submit">로그인</S.LoginButton>
            </S.Actions>
          </S.LoginForm>

          <S.Divider>
            <span>또는</span>
          </S.Divider>
          */}

          {/* ✅ Google 로그인 버튼 */}
          <S.GoogleLoginButton type="button" onClick={beginGoogle}>
            <img src="/img/Google__G__logo.svg.webp" alt="Google logo" />
            Google 계정으로 계속
          </S.GoogleLoginButton>

          {/* <S.SignUpText>
            아직 계정이 없으신가요?{" "}
            <S.SignUpLink to="/signup">회원가입</S.SignUpLink>
          </S.SignUpText> */}
        </S.FormSection>
      </S.Content>
    </S.LoginWrapper>
  );
};

export default LoginPage;
