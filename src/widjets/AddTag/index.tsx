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
import { Loader, Skeleton } from "../../shared/ui";
import { useTagStore, getTags, subscribeToTag } from "../../entities/tag";

const AddTag: React.FC = () => {
  const location = useLocation();
  const isAddNotifPath = location.pathname.includes("addNotif");
  const token = localStorage.getItem("authToken") || "";

  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const closeModal = useAddTagStore((state) => state.close);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true); // Новый флаг для загрузки тегов
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { tags, selectedTags, setFetchTags, setSelectedTags } = useTagStore();

  useEffect(() => {
    if (!token) return;

    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getTags();
        setFetchTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoadingTags(false); 
      }
    };

    fetchTags();
  }, []);

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

  const handleSubscriptionTag = async () => {
    setIsLoading(true);

    if (selectedTags.length === 0) {
      console.error("Ошибка: не выбран ни один тег.");
      setIsLoading(false);
      return;
    }

    try {
      // Подписываемся на все выбранные теги
      await Promise.all(
        selectedTags.map(async (tag) => {
          if (tag.id) {
            await subscribeToTag(tag.id);
          }
        })
      );

      // Очистка формы и показ успеха
      setSelectedTags([]);
      setIsSuccess(true);

      setTimeout(() => {
        closeModal();
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Ошибка подписки на тег:", error);
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
      ) : isAddNotifPath ? (
        <>
          <Flex>
            <PlainTitle>Существующие теги</PlainTitle>
            <Slider $height={90}>
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={tags} />
              )}
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
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="130px"/>
                ))
              ) : (
                <TagList initialTags={tags} />
              )}
            </Slider>
          </Flex>

          <Flex $align={"center"}>
            <Cat />
            <CustomButton
              onClick={handleSubscriptionTag}
              $style={"blue"}
              $width={"100%"}
            >
              Готово
            </CustomButton>
          </Flex>
        </>
      )}
    </ModalWindow>
  );
};

export default AddTag;
