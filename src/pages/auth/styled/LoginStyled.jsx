import styled from "styled-components"
import { Link } from "react-router-dom"

export const LoginWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 4rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 15% 20%, rgba(103, 72, 255, 0.35), transparent 55%),
    radial-gradient(circle at 85% 15%, rgba(58, 155, 255, 0.25), transparent 50%),
    radial-gradient(circle at 50% 80%, rgba(255, 80, 120, 0.2), transparent 55%),
    #050507;
  overflow: hidden;
  color: #f9fafb;
`;

export const BackgroundGlow = styled.div`
  position: absolute;
  inset: -25% auto auto -15%;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(130, 108, 255, 0.5), transparent 70%);
  filter: blur(80px);
  opacity: 0.8;
  pointer-events: none;
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  inset: auto -20% -35% auto;
  width: 640px;
  height: 640px;
  background: radial-gradient(circle, rgba(59, 173, 255, 0.45), transparent 65%);
  filter: blur(120px);
  opacity: 0.75;
  pointer-events: none;
`;

export const Content = styled.div`
  position: relative;
  width: min(960px, 100%);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: rgba(12, 12, 18, 0.75);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const BrandPanel = styled.div`
  position: relative;
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(155deg, rgba(67, 36, 180, 0.75) 0%, rgba(18, 18, 26, 0.85) 60%, rgba(5, 5, 10, 0.9) 100%);

  @media (max-width: 900px) {
    padding: 3rem 2.25rem;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #ffffff;
    transform: translateX(-2px);
  }
`;

export const BrandLogo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  img {
    height: 44px;
    width: auto;
  }

  span {
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }
`;

export const BrandHeading = styled.h1`
  margin: 0;
  font-size: clamp(1.9rem, 2.6vw, 2.6rem);
  font-weight: 600;
  line-height: 1.15;
  color: #ffffff;
`;

export const BrandCopy = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.9rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.82);
  }

  li::before {
    content: "";
    display: inline-flex;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.45);
  }
`;

export const FormSection = styled.div`
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgba(10, 10, 15, 0.72);

  @media (max-width: 900px) {
    padding: 3rem 2.25rem;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const FormTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.8rem, 2.4vw, 2.2rem);
  font-weight: 600;
  color: #ffffff;
`;

export const FormSubtitle = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.68);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const FieldLabel = styled.label`
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
`;

export const InputControl = styled.input`
  height: 48px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 0 1.05rem;
  font-size: 0.95rem;
  color: #ffffff;
  background: rgba(8, 8, 10, 0.55);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(130, 108, 255, 0.85);
    background: rgba(14, 14, 20, 0.9);
    box-shadow: 0 0 0 3px rgba(130, 108, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

export const LoginButton = styled.button`
  height: 52px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #836cff, #5a4df1);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 32px rgba(92, 77, 241, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  }

  span {
    white-space: nowrap;
  }
`;

export const GoogleLoginButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  height: 52px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(12, 12, 16, 0.55);
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

  img {
    height: 22px;
    width: 22px;
    object-fit: contain;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.32);
    background: rgba(18, 18, 24, 0.85);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SignUpText = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SignUpLink = styled(Link)`
  color: #9fa8ff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #c7ceff;
    text-decoration: underline;
  }
`;
