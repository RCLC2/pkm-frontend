import * as React from "react";
import ParticleImage, { ParticleOptions } from "react-particle-image";
import {
  Container,
  Content,
  Header,
  Title,
  Subtitle,
  ImageContainer,
  ImageWrapper,
  Footer,
  Badge,
} from "./ProductionStyled";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y);
    return pixel.b > 50;
  },
  color: ({ x, y, image }) => "white",
};

export default function Production() {
  return (
    <Container>
      <Content>
        <Header>
          <Title>Production</Title>
          <Subtitle>이미지 파티클로 표현된 창작물들을 감상하세요</Subtitle>
        </Header>

        <ImageContainer>
          <ImageWrapper>
            <ParticleImage
              src={"/360_F_1628950827_9DKxKQ6aSkcHdBaoVAWAzCJbm5Cd1kqu.jpg"}
              scale={0.5}
              entropy={15}
              maxParticles={10000}
              particleOptions={particleOptions}
              className="particle-image"
            />
          </ImageWrapper>
        </ImageContainer>

        <Footer>
          <Badge>
            <span>Interactive Particle Display</span>
          </Badge>
        </Footer>
      </Content>
    </Container>
  );
}
