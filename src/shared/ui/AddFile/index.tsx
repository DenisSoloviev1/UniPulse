import React from "react";
import { Square, FileItem } from "./style.ts";
import { Container, CustomButton, Flex } from "../index";
import { Close, Plus } from "../Icon/index.tsx";
import { IFile } from "../../types/index.ts";

interface AddFileProps {
  files: IFile[];
  onFilesChange: (files: IFile[]) => void;
}

export const AddFile: React.FC<AddFileProps> = ({ files, onFilesChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const processedFiles: IFile[] = [];
      let readCount = 0; // Для отслеживания завершения чтения всех файлов

      Array.from(selectedFiles).forEach((file) => {
        const fileType = file.type.split("/")[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            processedFiles.push({
              id: crypto.randomUUID(), // Генерация уникального id
              fileName: file.name,
              fileSize: file.size,
              type: fileType,
              data: e.target.result as string, // Сохранение base64 данных
            });

            readCount++;
            if (readCount === selectedFiles.length) {
              onFilesChange([...files, ...processedFiles]);
            }
          }
        };

        if (
          fileType === "image" ||
          fileType === "video" ||
          (fileType === "application" && file.name?.endsWith(".svg"))
        ) {
          reader.readAsDataURL(file);
        } else {
          processedFiles.push({
            id: crypto.randomUUID(),
            fileName: file.name,
            fileSize: file.size,
            type: fileType,
            data: "", // Для других типов файлов `data` будет пустым
          });

          readCount++;
          if (readCount === selectedFiles.length) {
            onFilesChange([...files, ...processedFiles]);
          }
        }
      });
    }
  };

  const handleRemoveFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    onFilesChange(updatedFiles);
  };

  return (
    <Flex $direction={"row"} $align={"center"} $gap={15}>
      {files.map((media) => (
        <FileItem key={media.id}>
          {media.type === "image" ||
          media.type === "video" ||
          media.fileName?.endsWith(".svg") ? (
            <Square>
              {media.type === "image" || media.fileName?.endsWith(".svg") ? (
                <img
                  src={media.data} // Используем base64 для отображения изображения
                  alt={media.fileName || "Uploaded"}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <video
                  src={media.data} // Используем base64 для отображения видео
                  controls
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </Square>
          ) : (
            <span>{media.fileName}</span>
          )}
          <CustomButton
            $style={"close"}
            type="button"
            onClick={() => handleRemoveFile(media.id)}
          >
            <Close />
          </CustomButton>
        </FileItem>
      ))}

      {files.length < 10 && (
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
      )}
    </Flex>
  );
};
