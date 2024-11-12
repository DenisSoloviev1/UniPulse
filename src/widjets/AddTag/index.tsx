import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
} from "../../shared/ui";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store";
import { TagList } from "../../entities/tag";
import { addTags } from "../../entities/tag";
import { Cat } from "../../shared/ui/Icon";

const AddTag: React.FC = () => {
  const location = useLocation();
  const isAddPulsePath = location.pathname.includes("addPulse"); // проверка пути
  const closeModal = useAddTagStore((state) => state.close);
  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const handleCreateTag = async () => {
    try {
      const response = await addTags(tagName, tagDescription);
      console.log("Тег создан:", response);
      setTagDescription("");
      setTagName("");
      closeModal();
    } catch (error) {
      console.error("Ошибка создания тега:", error);
    }
  };

  return (
    <ModalWindow>
      <Flex>
        <PlainTitle>
          {isAddPulsePath ? "Новый тег" : "Подписаться на тег"}
        </PlainTitle>
        <Slider $height={120}>
          <TagList />
        </Slider>
      </Flex>

      {isAddPulsePath ? (
        <Flex>
          <Container $width={"100%"}>
            <input
              type="text"
              placeholder="Название тега"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </Container>
          <Container $width={"100%"}>
            <input
              type="text"
              placeholder="Контингент"
              value={tagDescription}
              onChange={(e) => setTagDescription(e.target.value)}
            />
          </Container>
          <CustomButton
            type={"button"}
            onClick={handleCreateTag}
            $style={"blue"}
            $width={"100%"}
          >
            Создать
          </CustomButton>
        </Flex>
      ) : (
        <Flex $align={"center"}>
          <Cat />
          <CustomButton onClick={closeModal} $style={"blue"} $width={"100%"}>
            Готово
          </CustomButton>
        </Flex>
      )}
    </ModalWindow>
  );
};

export default AddTag;
