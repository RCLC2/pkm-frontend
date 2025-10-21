/* eslint-disable no-unused-vars */
import * as S from "./styled/LoginStyled";
import React, { useState, useEffect } from "react";
import { ArrowBigLeftDash, Home, User, Settings } from "lucide-react";
import { useBeginGoogleLogin } from "../../hooks/auth/useGoogleAuth"; // 경로 맞춰

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, serPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const beginGoogle = useBeginGoogleLogin();

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

  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const splineRef = React.useRef(null);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const checkFPS = () => {
      frameCount++;
      const now = performance.now();
      const duration = now - startTime;

      if (duration >= 1000) {
        const fps = (frameCount / duration) * 1000;

        if (fps >= 100) setShouldRenderSpline(true);
        else {
          setShouldRenderSpline(false);
          setTimeout(() => {
            if (splineRef.current && splineRef.current.stop) {
              splineRef.current.stop();
            }
          }, 3000);
        }

        return;
      }

      requestAnimationFrame(checkFPS);
    };

    requestAnimationFrame(checkFPS);
  }, []);

  return (
    <S.LoginWrapper>
      {/* Navigation Bar */}
      <S.NavigationBar>
        <S.NavLogo>
          <img src="/svg/hspace-logo-edited.svg" alt="H-Space Logo" />
        </S.NavLogo>
        <S.NavLinks>
          <S.NavLink to="/">
            <Home size={16} style={{ marginRight: "5px" }} />
            Home
          </S.NavLink>
          <S.NavLink to="/dashboard">
            <User size={16} style={{ marginRight: "5px" }} />
            Dashboard
          </S.NavLink>
          <S.NavLink to="/settings">
            <Settings size={16} style={{ marginRight: "5px" }} />
            Settings
          </S.NavLink>
        </S.NavLinks>
        <S.NavButton>Get Started</S.NavButton>
      </S.NavigationBar>

      {/* <S.SplineObjectWrapper>
        <Spline
          ref={splineRef}
          scene={
            shouldRenderSpline
              ? "/spline/domino.spline"
              : "/spline/norotate.spline"
          }
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.error("🔴 Spline load error", e);
            setShouldRenderSpline(false);
          }}
        />
      </S.SplineObjectWrapper> */}

      {/* {isLoaded ? ( */}
      <>
        {/* 여기 로그인 폼 */}
        <S.LoginForm onSubmit={handleLogin}>
          <S.ArrowBigLeftDash>
            <S.A to="/">
              <ArrowBigLeftDash />
            </S.A>
          </S.ArrowBigLeftDash>
          <S.LogoImag>
            <img src="/svg/hspace-logo-edited.svg" alt="logo" />
          </S.LogoImag>
          {/* <h1>Login</h1> */}
          <S.InputWrapper>
            <S.Input>
              <S.InputTag
                id="LidInput"
                type="text"
                required
                equal={true}
                onChange={(e) => setUserName(e.target.value)}
              ></S.InputTag>
              <S.Label htmlFor="LidInput">ID: </S.Label>
              <S.UnderLine></S.UnderLine>
            </S.Input>
            <S.Input>
              <S.InputTag
                id="password"
                type="password"
                required
                equal={true}
                onChange={(e) => serPassword(e.target.value)}
              ></S.InputTag>
              <S.Label htmlFor="password">PW: </S.Label>
              <S.UnderLine></S.UnderLine>
            </S.Input>
          </S.InputWrapper>
          <S.LoginButtonWrapper>
            <S.LoginButton type="submit">Login</S.LoginButton>
            <S.SplitLine>
              <hr /> · <hr />
            </S.SplitLine>
            <S.GoogleLoginButton onClick={beginGoogle}>
              <img src="/img/Google__G__logo.svg.webp" alt="google logo" />
              Login With Google
            </S.GoogleLoginButton>
          </S.LoginButtonWrapper>
          <S.A to="/signup">You don't have an account?</S.A>
        </S.LoginForm>
        <S.EffectDiv />
        <S.EffectEntire />
      </>
      {/* ) : (
        <div style={{
          color: 'white',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5em'
        }}>
          Loading...
        </div> */}
      {/* )} */}
    </S.LoginWrapper>
  );
};

export default LoginPage;
