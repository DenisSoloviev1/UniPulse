import { InputHTMLAttributes } from "react";
import { Container } from "../Container";

export const InputText: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <Container $width={"100%"}>
      <input {...props} />
    </Container>
  );
};
