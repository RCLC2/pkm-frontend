import * as S from "./InputStyled";

export function Input({ className, ...props }) {
  return <S.StyledInput className={className} {...props} />;
}
