import * as S from "./TextareaStyled";

export function Textarea({ className, ...props }) {
  return <S.StyledTextarea className={className} {...props} />;
}
