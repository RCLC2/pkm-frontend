/* eslint-disable no-unused-vars */
import * as S from "./styled/LoginStyled";
import React, { useState } from "react";
import { ArrowBigLeftDash } from "lucide-react";
// import { login } from "../../hook/Auth/AuthLogin";
// import { Verify } from "../../hook/Auth/AuthVerify";
// import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, serPassword] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const result = await Verify();
  //     if (result.username) {
  //       alert("이미 로그인 되어 있습니다.")
  //       navigate('/dashboard');
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  // 로그인 요청 처리
  const handleLogin = async () => {
    // const handleLogin = async (e) => {
    // e.preventDefault();
    // const result = await login({ username: userName, password });
    // if (result.success) {
    //   alert("반갑습니다 " + userName + "님!")
    //   // 로그인 성공 시 처리
    //   navigate('/dashboard');
    // } else {
    //   alert("로그인 실패: " + result.error)
    // }
  };

  return (
    <S.LoginWrapper>
      <S.BackgroundGlow />
      <S.BackgroundGradient />
      <S.Content>
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
            프로젝트를 빠르게 시작하고 끝까지 완성하도록 도와드립니다.
          </S.BrandCopy>
          <S.FeatureList>
            <li>프로젝트별 맞춤 서가 테마 유지</li>
            <li>워크플로우에 맞춘 템플릿으로 바로 시작</li>
            <li>팀과 지식을 공유하며 발전시키기</li>
          </S.FeatureList>
        </S.BrandPanel>

        <S.FormSection>
          <S.FormHeader>
            <S.FormTitle>로그인</S.FormTitle>
            <S.FormSubtitle>
              계정에 접속해 당신의 책장을 계속 디자인하고 관리하세요.
            </S.FormSubtitle>
          </S.FormHeader>

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
                onChange={(e) => serPassword(e.target.value)}
              />
            </S.Field>
            <S.Actions>
              <S.LoginButton type="submit">로그인</S.LoginButton>
            </S.Actions>
          </S.LoginForm>

          <S.Divider>
            <span>또는</span>
          </S.Divider>

          <S.GoogleLoginButton type="button">
            <img src="/img/Google__G__logo.svg.webp" alt="Google logo" />
            Google 계정으로 계속
          </S.GoogleLoginButton>

          <S.SignUpText>
            아직 계정이 없으신가요?
            <S.SignUpLink to="/signup">회원가입</S.SignUpLink>
          </S.SignUpText>
        </S.FormSection>
      </S.Content>
    </S.LoginWrapper>
  );
};

export default LoginPage;
