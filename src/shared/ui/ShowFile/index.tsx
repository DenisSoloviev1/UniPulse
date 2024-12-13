import React from "react";
import { IFile } from "../../types";
import { Flex } from "../Flex";
import { MediaGrid, MediaItem, FileList } from "./style";
import { baseUrl } from "../../config";
import { INotif } from "../../../entities/notification";

interface ShowFileProps {
  files: IFile[];
  idNotif: INotif["id"];
}

export const ShowFile: React.FC<ShowFileProps> = ({ files, idNotif }) => {
  // Фильтрация изображений, видео и SVG
  const media = files.filter(
    (file) =>
      (file.type === "image" ||
        file.type === "video" ||
        (file.type === "application" && file.fileName?.endsWith(".svg"))) &&
      file.fileName
  );

  // Фильтрация остальных файлов
  const otherFiles = files.filter(
    (file) =>
      !(
        file.type === "image" ||
        file.type === "video" ||
        (file.type === "application" && file.fileName?.endsWith(".svg"))
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
                <video
                  src={`${baseUrl}/api/notifications/${idNotif}/${file.fileName}`}
                  controls
                />
              ) : (
                <img
                  src={`${baseUrl}/api/notifications/${idNotif}/${file.fileName}`}
                  alt={file.fileName || `media ${index}`}
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
              <a
                href={`${baseUrl}/api/notifications/${idNotif}/${file.fileName}`}
                download={file.fileName}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.fileName || `file-${index}`}
              </a>
            </li>
          ))}
        </FileList>
      )}
    </Flex>
  );
};
