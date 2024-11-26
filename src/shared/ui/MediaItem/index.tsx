import React, { useState } from "react";
import { Square, FileItem } from "./style.ts";
import { Container, CustomButton, Flex } from "../index";
import { Close, Plus } from "../Icon";

interface MediaItemProps {
  onFilesChange: (
    files: Array<{ fileName: string; fileSize: number; data: string }>
  ) => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({ onFilesChange }) => {
  const [mediaFiles, setMediaFiles] = useState<
    Array<{ src: string; type: string; name: string }>
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newMediaFiles: Array<{ src: string; type: string; name: string }> =
        [];
      const processedFiles: Array<{
        fileName: string;
        fileSize: number;
        data: string;
      }> = [];

      Array.from(files).forEach((file) => {
        const fileType = file.type.split("/")[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            // Добавляем в массив для состояния
            newMediaFiles.push({
              src: e.target.result as string,
              type: fileType,
              name: file.name,
            });

            // Подготавливаем данные для передачи
            processedFiles.push({
              fileName: file.name,
              fileSize: file.size,
              data: (e.target.result as string).split(",")[1] || "", // base64
            });

            // Если все файлы обработаны, обновляем состояние и вызываем callback
            if (newMediaFiles.length === files.length) {
              setMediaFiles((prev) => [...prev, ...newMediaFiles]);
              onFilesChange([...processedFiles]); // Передаём корректные данные
            }
          }
        };

        if (
          fileType === "image" ||
          fileType === "video" ||
          (fileType === "application" && file.name.endsWith(".svg"))
        ) {
          reader.readAsDataURL(file);
        } else {
          // Обработка других файлов (например, PDF, текстовые файлы)
          newMediaFiles.push({
            src: file.name,
            type: fileType,
            name: file.name,
          });
          processedFiles.push({
            fileName: file.name,
            fileSize: file.size,
            data: "", // Для немедиа файлов base64 может отсутствовать
          });
          if (newMediaFiles.length === files.length) {
            setMediaFiles((prev) => [...prev, ...newMediaFiles]);
            onFilesChange([...processedFiles]); // Передаём корректные данные
          }
        }
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setMediaFiles((prev) => {
      const updatedMediaFiles = [...prev];
      updatedMediaFiles.splice(index, 1); // Удаляем элемент из массива
      return updatedMediaFiles;
    });

    // Если требуется, также можно вызывать onFilesChange для обновления списка в родительском компоненте
    onFilesChange(
      mediaFiles
        .filter((_, i) => i !== index) // Исключаем удаленный элемент
        .map((file) => ({
          fileName: file.name,
          fileSize: 0, // Размер не сохраняется, нужно обработать в зависимости от требований
          data: "", // base64 данные, если требуется
        }))
    );
  };

  return (
    <Flex $direction={"row"} $align={"center"} $gap={15}>
      {mediaFiles.map((media, index) => (
        <FileItem key={index}>
          {media.type === "image" ||
          media.type === "video" ||
          media.name.endsWith(".svg") ? (
            <Square>
              {media.type === "image" || media.name.endsWith(".svg") ? (
                <img src={media.src} alt="Uploaded" />
              ) : (
                <video src={media.src} controls />
              )}
            </Square>
          ) : (
            <span>{media.name}</span>
          )}
          <CustomButton
            $style={"close"}
            type="button"
            onClick={() => handleRemoveFile(index)}
          >
            <Close />
          </CustomButton>
        </FileItem>
      ))}

      {mediaFiles.length < 10 ? (
        <label htmlFor="input">
          <Container $padding={[0]} $border={16}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="input"
            />
            <Square>
              <Plus />
            </Square>
          </Container>
        </label>
      ) : (
        <></>
      )}
    </Flex>
  );
};
