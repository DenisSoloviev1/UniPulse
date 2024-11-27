import React, { useState } from "react";
import { Tag } from "../ui";
import { Flex, CustomButton, ModalWindow } from "../../../shared/ui";
import {
  ITag,
  useTagStore,
  toggleTagSelect,
  handleDeleteSubscription,
} from "../model";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";

interface TagListProps {
  initialTags: ITag[];
  choiseTags?: boolean;
  styleTags?: "normal" | "light" | "choice";
}

export const TagList: React.FC<TagListProps> = ({
  initialTags = [],
  choiseTags = true,
  styleTags,
}) => {
  const { selectedTags, setSelectedTags } = useTagStore();
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isOpenDeleteSubscription = useModalStore((state) =>
    state.isOpen("DeleteSubscription")
  );

  // Состояние для хранения выбранного тега
  const [tagToDelete, setTagToDelete] = useState<ITag | null>(null);

  const handleTagClick = (tag: ITag) => {
    if (choiseTags) {
      toggleTagSelect(tag.id, initialTags, selectedTags, setSelectedTags);
    } else {
      setTagToDelete(tag); // Устанавливаем тег для удаления
      openModal("DeleteSubscription"); // Открываем модальное окно
    }
  };

  const handleConfirmDelete = async () => {
    if (tagToDelete) {
      await handleDeleteSubscription(tagToDelete.id); // Удаляем выбранный тег
      setTagToDelete(null); // Очищаем состояние
      closeModal("DeleteSubscription"); // Закрываем модальное окно
    }
  };

  return (
    <article>
      <Flex $direction={"row"} $wrap={true} $align={"center"}>
        {initialTags.length !== 0 ? (
          initialTags.map((tag) => {
            const isSelected = selectedTags.some(
              (selectedTag) => selectedTag.id === tag.id
            );

            return (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                color={
                  styleTags ? styleTags : isSelected ? "choice" : undefined
                } // Применяем стиль "choice" только для выбранных тегов
                onClick={() => handleTagClick(tag)} // Обработчик клика
              />
            );
          })
        ) : (
          <p>Тегов нет</p>
        )}

        <ModalWindow
          onClick={() => closeModal("DeleteSubscription")}
          show={isOpenDeleteSubscription}
          position={["", "20px", "50%", ""]}
          width={"250px"}
          height={"130px"}
        >
          <p>
            Отписаться от тега: <strong>{tagToDelete?.name}</strong>?
          </p>
          <Flex $direction={"row"} $align={"center"} $width={"100%"} $gap={10}>
            <CustomButton
              $style={"gray"}
              $width={"50%"}
              onClick={handleConfirmDelete} // Обработчик подтверждения
            >
              Да
            </CustomButton>

            <CustomButton
              $style={"blue"}
              $width={"50%"}
              onClick={() => closeModal("DeleteSubscription")} // Отмена
            >
              Нет
            </CustomButton>
          </Flex>
        </ModalWindow>
      </Flex>
    </article>
  );
};
