import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Container } from "../index";

export const MediaItem: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<
    Array<{ src: string; type: string }>
  >([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newMediaFiles: Array<{ src: string; type: string }> = [];

      Array.from(files).forEach((file) => {
        const fileType = file.type.split("/")[0]; // image, video, application (e.g., PDF)
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            newMediaFiles.push({
              src: e.target.result as string,
              type: fileType,
            });
            setMediaFiles((prev) => [...prev, ...newMediaFiles]);
          }
        };

        if (fileType === "image" || fileType === "video") {
          reader.readAsDataURL(file); // Для изображений и видео
        } else {
          newMediaFiles.push({ src: file.name, type: fileType }); // Для остальных файлов просто отображаем имя
          setMediaFiles((prev) => [...prev, ...newMediaFiles]);
        }
      });
    }
  };

  return (
    <>
      {mediaFiles.length > 0 ? (
        <>
          <div className={styles.mediaPreview}>
            {mediaFiles.map((media, index) => (
              <div key={index} className={styles.mediaItem}>
                {media.type === "image" && (
                  <img
                    src={media.src}
                    alt="Uploaded"
                    className={styles.square}
                  />
                )}
                {media.type === "video" && (
                  <video src={media.src} controls className={styles.square} />
                )}
                {media.type !== "image" && media.type !== "video" && (
                  <div className={styles.fileItem}>
                    <span>{media.src}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <label htmlFor="input">
            <Container className={"pd0 br16"}>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={styles.hiddenInput}
                id="input"
              />
              <div className={styles.square}>+</div>
            </Container>
          </label>
        </>
      ) : (
        <label htmlFor="input">
          <Container className={"pd0 br16"}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.hiddenInput}
              id="input"
            />
            <div className={styles.square}>+</div>
          </Container>
        </label>
      )}
    </>
  );
};
