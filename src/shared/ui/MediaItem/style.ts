import styled from "styled-components";
import "../../variables.scss";

export const Square = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 30px;
  object-fit: cover;
`;
export const MediaPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  word-break: break-word;
`;
