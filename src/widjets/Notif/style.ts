import styled from "styled-components";
import "../../shared/Variables.scss";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: 0px;
  resize: none;
  outline: none;
`;

export const Error = styled.span`
  color: var(--color-delete);
`;

export const TextMore = styled.p`
  width: 100%;
  font-size: 20px;
  min-height: 1rem;
`;

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 700;
`;
