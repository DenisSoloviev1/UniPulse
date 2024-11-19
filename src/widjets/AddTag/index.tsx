import React, { useState, useEffect } from "react";
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
import { addTag } from "../../entities/tag";
import { Cat, DoneSvg } from "../../shared/ui/Icon";
import { Loader } from "../../shared/ui";
import { useTagStore, getTags } from "../../entities/tag";

const AddTag: React.FC = () => {
  const location = useLocation();
  const isAddPulsePath = location.pathname.includes("addPulse");
  const token = localStorage.getItem("authToken") || "";

  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const closeModal = useAddTagStore((state) => state.close);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { tags, setFetchTags } = useTagStore();


  useEffect(() => {
    if (!token) return;

    const fetchTags = async () => {
      try {
        const responseData = await getTags();
        setFetchTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      }
    };

    fetchTags();
  }, [token, setFetchTags]);

  const handleCreateTag = async () => {
    setIsLoading(true);
    try {
      await addTag(tagName, tagDescription);

      // Очистка формы и показ успеха
      setTagDescription("");
      setTagName("");
      setIsSuccess(true);

      setTimeout(() => {
        closeModal();
        setIsSuccess(false);
      }, 1500);
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
      ) : isAddPulsePath ? (
        <>
          <Flex>
            <PlainTitle>Существующие теги</PlainTitle>
            <Slider $height={90}>
              <TagList initialTags={tags} />
            </Slider>
          </Flex>
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
        </>
      ) : (
        <>
          <Flex>
            <PlainTitle>Подписаться на тег</PlainTitle>
            <Slider $height={90}>
              <TagList initialTags={tags} />
            </Slider>
          </Flex>

          <Flex $align={"center"}>
            <Cat />
            <CustomButton onClick={closeModal} $style={"blue"} $width={"100%"}>
              Готово
            </CustomButton>
          </Flex>
        </>
      )}
    </ModalWindow>
  );
};

export default AddTag;
