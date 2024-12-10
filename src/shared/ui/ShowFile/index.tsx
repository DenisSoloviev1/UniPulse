import React from "react";
import { IFile } from "../../types";
import { Flex } from "../Flex";
import { MediaGrid, MediaItem, FileList,  } from "./style";

interface ShowFileProps {
  files: IFile[];
}

export const ShowFile: React.FC<ShowFileProps> = ({ files }) => {
  // Фильтрация изображений, видео и SVG
  const media = files.filter(
    (file) =>
      (file.type === "image" ||
        file.type === "video" ||
        (file.type === "application" && file.name?.endsWith(".svg"))) &&
      file.src
  );

  // Фильтрация остальных файлов
  const otherFiles = files.filter(
    (file) =>
      !(
        file.type === "image" ||
        file.type === "video" ||
        (file.type === "application" && file.name?.endsWith(".svg"))
      )
  );

  return (
    <Flex $width={"100%"}>
      {/* Отображение медиафайлов */}
      {media.length > 0 && (
        <MediaGrid>
          {media.map((file, index) => (
            <MediaItem key={file.id || index}>
              {file.type === "video" ? (
                <video src={file.src} controls />
              ) : (
                <img
                  src={file.src}
                  alt={file.name || `media ${index}`}
                  loading="lazy"
                />
              )}
            </MediaItem>
          ))}
        </MediaGrid>
      )}

      {/* Отображение остальных файлов */}
      {otherFiles.length > 0 && (
        <FileList>
          {otherFiles.map((file, index) => (
            <li key={file.id || index}>
              <a href={file.src} download={file.name} target="_blank" rel="noopener noreferrer">
                {file.name || `file-${index}`}
              </a>
            </li>
          ))}
        </FileList>
      )}
    </Flex>
  );
};
