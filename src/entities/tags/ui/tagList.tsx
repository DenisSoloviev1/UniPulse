import React, { useState, ReactNode } from "react";
import { Flex, ModalWindow, CustomButton } from "../../../shared/ui";
import { Tag } from "./index";
import { useAddTagStore } from "../../../shared/ui/ModalWindow/store";
import styles from "./styles.module.scss";
import { arrayTag } from "../../../assets/date";

interface TagListProps {
  title: string;
  children?: ReactNode;
}

export const TagList: React.FC<TagListProps> = ({ title, children }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const openModal = useAddTagStore((state) => state.open);

  // Функция для выбора/снятия выделения тега
  const addTagSelect = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      !prevSelectedTags.includes(id)
        ? [...prevSelectedTags, id]
        : prevSelectedTags
    );
  };

  const deleteTagSelect = (id: string) => {
    setSelectedTags(
      (prevSelectedTags) =>
        prevSelectedTags.includes(id)
          ? prevSelectedTags.filter((tagId) => tagId !== id) // Убираем тег, если он выбран
          : prevSelectedTags // Возвращаем неизменённый массив, если тега нет
    );
  };

  return (
    <article>
      <Flex title={title} className={"row"}>
        {selectedTags.length > 0 ? (
          selectedTags.map((id) => {
            const selectedTag = arrayTag.find((tag) => tag.id === id);
            return selectedTag ? (
              <Tag
                key={id}
                id={id}
                name={selectedTag.name}
                onClick={() => deleteTagSelect(id)}
                close={true}
              />
            ) : null;
          })
        ) : (
          <p>Теги не выбраны</p>
        )}

        <ModalWindow>
          <Flex title={"Существующие теги"} className={"row"}>
            <div className={styles.slider}>
              {arrayTag.map((tag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  isActive={true}
                  onClick={() => addTagSelect(tag.id)}
                />
              ))}
            </div>
          </Flex>

          {children}
        </ModalWindow>

        <CustomButton className={"blue"} onClick={openModal}>
          +
        </CustomButton>
      </Flex>
    </article>
  );
};
