import * as React from "react";
import ParticleImage from "react-particle-image";
import * as S from "./ProductionStyled";
import { useEffect, useRef } from "react";
import Topbar from "../../component/productiontopbar/ProductionTopbar";

const particleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    
    return pixel.b < 50;
  },
  // eslint-disable-next-line no-unused-vars
  color: ({ x, y, image }) => "rgba(255,255,255,0.3)",
  
};

export default function Production({handleScroll, isScrolled}) {
  const wrapperRef = useRef(null);


  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      handleScroll(wrapper.scrollTop > 50);
    };

    wrapper.addEventListener("scroll", onScroll);

    return () => wrapper.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <S.Container ref={wrapperRef}>
      <Topbar isScrolled={isScrolled}/>
      <S.Content>
        <S.Section>
          <S.ImageContainer>
            <ParticleImage
              src={"/Gemini_Generated_Image_icchsmicchsmicch.png"}
              scale={0.7}
              entropy={20}
              maxParticles={4200}
              particleOptions={particleOptions}
              backgroundColor="#1b1b1b"
            />
          </S.ImageContainer>
          <S.TitleWrapper>
            <S.Title>Project Name</S.Title>
            <S.Subtitle>모든 생각을 기록하고, 연결하고, 확장하세요</S.Subtitle>
            <S.Badge>
            <span>Let's Start</span>
          </S.Badge>
          </S.TitleWrapper>
        </S.Section>
        <S.Footer>
        
        </S.Footer>

        {/* 스크롤 테스트를 위한 긴 콘텐츠 */}
        <div style={{ height: "200vh", padding: "2rem" }}>
          <p style={{ color: "white", fontSize: "1.2rem", lineHeight: "1.8" }}>
            프로덕션 페이지
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </p>
        </div>
      </S.Content>
    </S.Container>
  );
}
