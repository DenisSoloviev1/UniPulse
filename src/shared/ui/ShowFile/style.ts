import styled from "styled-components";
import "../../Variables.scss";

// Сетка для медиафайлов
export const MediaGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Два столбца для телефонов */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(
      1,
      1fr
    ); /* Один столбец для маленьких экранов */
  }
`;

// Элементы медиафайлов
export const MediaItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f9f9f9;

  img,
  video {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 8px;
  }

  video {
    background: #000;
  }
`;

// Список остальных файлов
export const FileList = styled.ul`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

