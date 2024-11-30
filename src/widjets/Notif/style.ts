import styled from "styled-components";
import "../../shared/Variables.scss"

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: 0px;
  resize: none;
  outline: none;
`;

export const Error = styled.span`
color: var(--color-delete);
`