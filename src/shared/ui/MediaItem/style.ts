import styled from "styled-components";
import "../../variables.scss";

export const Square = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--color-background-container);

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  text-align: center;
  word-break: break-word;
`;
