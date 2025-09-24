import * as S from "./ButtonStyled";

export function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}) {
  return (
    <S.StyledButton
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </S.StyledButton>
  );
}
