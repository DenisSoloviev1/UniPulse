import React, { useState } from "react";
import { Square, MediaPreview, FileItem } from "./style.ts";
import { Container, Flex } from "../index";

export const MediaItem: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<
    Array<{ src: string; type: string }>
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newMediaFiles: Array<{ src: string; type: string }> = [];

      Array.from(files).forEach((file) => {
        const fileType = file.type.split("/")[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            newMediaFiles.push({
              src: e.target.result as string,
              type: fileType,
            });
            // Устанавливаем новое состояние один раз, после цикла
            setMediaFiles((prev) => [...prev, ...newMediaFiles]);
          }
        };

        if (fileType === "image" || fileType === "video") {
          reader.readAsDataURL(file);
        } else {
          // Обработка не-медиа файлов (например, PDF)
          newMediaFiles.push({ src: file.name, type: fileType });
          setMediaFiles((prev) => [...prev, ...newMediaFiles]);
        }
      });
    }
  };

  return (
    <Flex $direction={"row"}>
      <MediaPreview>
        {mediaFiles.map((media, index) => (
          <FileItem key={index}>
            {media.type === "image" && (
              <Square>
                <img src={media.src} alt="Uploaded" />
              </Square>
            )}
            {media.type === "video" && (
              <Square>
                <video src={media.src} controls />
              </Square>
            )}
            {media.type !== "image" && media.type !== "video" && (
              <span>{media.src}</span>
            )}
          </FileItem>
        ))}
      </MediaPreview>

      {/* Кнопка для загрузки */}
      <label htmlFor="input">
        <Container $padding={[0]} $border={16}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="input"
          />
          <Square>+</Square>
        </Container>
      </label>
    </Flex>
  );
};
