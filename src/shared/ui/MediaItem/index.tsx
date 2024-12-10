import React from "react";
import { Square, FileItem } from "./style.ts";
import { Container, CustomButton, Flex } from "../index";
import { Close, Plus } from "../Icon";

interface MediaItemProps {
  files: Array<{
    id: string;
    fileName: string;
    fileSize: number;
    data: string;
    type: string;
  }>;
  onFilesChange: (
    files: Array<{
      id: string;
      fileName: string;
      fileSize: number;
      data: string;
      type: string;
    }>
  ) => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({
  files,
  onFilesChange,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const processedFiles: Array<{
        id: string;
        fileName: string;
        fileSize: number;
        data: string;
        type: string;
      }> = [];

      Array.from(selectedFiles).forEach((file) => {
        const fileType = file.type.split("/")[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            processedFiles.push({
              id: crypto.randomUUID(), // Генерация уникального id
              fileName: file.name,
              fileSize: file.size,
              data: (e.target.result as string).split(",")[1] || "",
              type: fileType,
            });

            if (processedFiles.length === selectedFiles.length) {
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
            data: "",
            type: fileType,
          });

          if (processedFiles.length === selectedFiles.length) {
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
      {files.map((media, index) => (
        <FileItem key={media.id || index}> {/* Уникальный ключ */}
          {media.type === "image" ||
          media.type === "video" ||
          media.fileName?.endsWith(".svg") ? ( // Добавили проверку fileName
            <Square>
              {media.type === "image" || media.fileName?.endsWith(".svg") ? (
                <img
                  src={`data:image/*;base64,${media.data}`}
                  alt={media.fileName || "Uploaded"}
                />
              ) : (
                <video
                  src={`data:video/*;base64,${media.data}`}
                  controls
                />
              )}
            </Square>
          ) : (
            <span>{media.fileName}</span>
          )}
          <CustomButton
            $style={"close"}
            type="button"
            onClick={() => handleRemoveFile(media.id)} // Удаляем файл по id
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
