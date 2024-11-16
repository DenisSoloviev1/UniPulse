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
import { Tag } from "../../entities/tag";
import { createTags } from "../../entities/tag";
import { Cat, DoneSvg } from "../../shared/ui/Icon";
import { Loader } from "../../shared/ui";
import { useTagStore, useTagSelect, useFetchTags } from "../../entities/tag";

const AddTag: React.FC = () => {
  const location = useLocation();
  const isAddPulsePath = location.pathname.includes("addPulse");

  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const closeModal = useAddTagStore((state) => state.close);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { tags, selectedTags } = useTagStore();
  const toggleTagSelect = useTagSelect();

  // Вызовите useFetchTags для загрузки тегов
  useFetchTags();

  const handleCreateTag = async () => {
    setIsLoading(true);
    try {
      const response = await createTags(tagName, tagDescription);
      const error = response.error;

      if (!error) {
        setTagDescription("");
        setTagName("");
        setIsSuccess(true);

        setTimeout(() => {
          closeModal();
          setIsSuccess(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Ошибка создания тега:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWindow>
      {isLoading ? (
        <Loader $size="200px" />
      ) : isSuccess ? (
        <DoneSvg />
      ) : (
        <>
          <Flex>
            <PlainTitle>
              {isAddPulsePath ? "Существующие теги" : "Подписаться на тег"}
            </PlainTitle>
            <Slider $height={90}>
              {tags.map((tag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  isActive={selectedTags.some(
                    (selectedTag) => selectedTag.id === tag.id
                  )}
                  onClick={() => toggleTagSelect(tag.id)}
                />
              ))}
            </Slider>
          </Flex>

          {isAddPulsePath ? (
            <Flex>
              <PlainTitle>Новый тег</PlainTitle>
              <Container $width={"100%"}>
                <input
                  type="text"
                  placeholder="название"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
              </Container>
              <Container $width={"100%"}>
                <input
                  type="text"
                  placeholder="описание"
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
              <CustomButton
                onClick={closeModal}
                $style={"blue"}
                $width={"100%"}
              >
                Готово
              </CustomButton>
            </Flex>
          )}
        </>
      )}
    </ModalWindow>
  );
};

export default AddTag;
