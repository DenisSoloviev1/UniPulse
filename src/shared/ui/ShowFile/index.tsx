import React from "react";
import { IFile } from "../../types";
import { Flex } from "../Flex";
import { MediaGrid, MediaItem, FileList } from "./style";
import { baseUrl } from "../../config";
import { INotif } from "../../../entities/notification";

interface ShowFileProps {
  files: IFile[];
  idNotif: INotif["id"]; // не понял зачем ты так обращаешься, если нужно так обратится то лучше вынести в отдельный тип
}

export const ShowFile: React.FC<ShowFileProps> = ({ files, idNotif }) => {
  // Фильтрация изображений, видео и SVG
  const media = files.filter(
    (
      file // думаю можно в интерфейс добавить перечисление типов и избавится от таких больших проверок
    ) =>
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
  //  две этих фильтра лучше переписать на один reduce, который вернет объект с двумя полями {otherFiles, media}

  return (
    <Flex $width={"100%"}>
      {/* Отображение медиафайлов */}
      {media.length > 0 && ( // можно проще !!media.length
        <MediaGrid>
          {media.map((file, index) => (
            <MediaItem key={file.id || index}>
              {file.type === "video" ? ( // это стоит вынести в компонент и проверять в нем или сделать либо сделать объект возвращающий компонент
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
