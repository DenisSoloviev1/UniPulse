import React, { useState, useEffect, ReactNode } from "react";
import { getTags } from "../api";
import { Flex, ModalWindow, CustomButton } from "../../../shared/ui";
import { Tag } from "../ui";
import { useTagStore } from "../model";
import { useAddTagStore } from "../../../shared/ui/ModalWindow/store";
import styles from "./styles.module.scss";

interface TagListProps {
  children?: ReactNode;
}

export const TagList: React.FC<TagListProps> = ({ children }) => {
  const { tags, setTags } = useTagStore();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const openModal = useAddTagStore((state) => state.open);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        setTags(tagsData); // Устанавливаем массив тегов
        console.log("Загруженные теги:", tagsData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      }
    };
  
    fetchTags();
  }, [setTags]);

  // Функция для выбора/снятия выделения тега
  const addTagSelect = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      !prevSelectedTags.includes(id)
        ? [...prevSelectedTags, id]
        : prevSelectedTags
    );
  };

  const deleteTagSelect = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : prevSelectedTags
    );
  };

  return (
    <article>
      <Flex $direction={"row"}>
        {selectedTags.length > 0 ? (
          selectedTags.map((id) => {
            const selectedTag = tags.find((tag) => tag.id === id);
            return selectedTag ? (
              <Tag
                key={id}
                id={id}
                name={selectedTag.name}
                onClick={() => deleteTagSelect(id)}
                close={"small"}
              />
            ) : null;
          })
        ) : (
          <p>Пусто</p>
        )}

        {/* <ModalWindow>
          <Flex title={"Существующие теги"} $direction={"row"}>
            <div className={styles.slider}>
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    isActive={true}
                    onClick={() => addTagSelect(tag.id)}
                  />
                ))
              ) : (
                <p>Теги не найдены</p>
              )}
            </div>
          </Flex>

          {children}
        </ModalWindow> */}

      </Flex>
    </article>
  );
};
