import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
  Loader,
  Skeleton,
} from "../../shared/ui";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { TagList } from "../../entities/tag";
import { addTag } from "../../entities/tag";
import { Cat, ComplitedSvg } from "../../shared/ui/Icon";
import {
  useTagStore,
  getTags,
  getSubscriptionToTags,
} from "../../entities/tag";
import { subscribeToTag } from "../../entities/subscription";
import { Error } from "../CreatNotif/style";

const AddTag: React.FC = () => {
  const location = useLocation();
  const isAddNotifPath = location.pathname.includes("addNotif");
  const token = localStorage.getItem("authToken") || "";

  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const closeModal = useModalStore((state) => state.close);
  const isOpenAddTag = useModalStore((state) => state.isOpen("AddTag"));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    tags,
    subscriptionToTags,
    selectedTags,
    setTags,
    setSubscriptionToTags,
    setSelectedTags,
  } = useTagStore();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        let responseData;
        if (isAddNotifPath) {
          responseData = await getTags();
          setTags(responseData);
        } else {
          responseData = await getSubscriptionToTags();
          setSubscriptionToTags(responseData);
        }
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
      if (tagName.length === 0 || tagDescription.length === 0) {
        setError("Заполните все поля");
        return;
      }
      await addTag(tagName, tagDescription);

      // Очистка формы и показ успеха
      setTagDescription("");
      setTagName("");
      setIsSuccess(true);
      setError("");

      setTimeout(() => {
        closeModal("AddTag");
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
        closeModal("AddTag");
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Ошибка подписки на тег:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWindow show={isOpenAddTag} onClick={() => closeModal("AddTag")}>
      {isLoading ? (
        <Loader $size="200px" />
      ) : isSuccess ? (
        <ComplitedSvg />
      ) : isAddNotifPath ? (
        <>
          <Flex $width={"100%"} $gap={10}>
            <Flex>
              <PlainTitle>Существующие теги</PlainTitle>
              <Slider $height={100} $wrap={true}>
                {isLoadingTags ? (
                  Array.from({ length: 7 }).map((_, index) => (
                    <Skeleton key={index} $width="125px" />
                  ))
                ) : (
                  <TagList initialTags={tags} />
                )}
              </Slider>
            </Flex>

            <Flex $width={"100%"}>
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

              <Error>{error}</Error>
            </Flex>
          </Flex>

          <CustomButton
            type={"button"}
            onClick={handleCreateTag}
            $style={"blue"}
            $width={"70%"}
          >
            Создать
          </CustomButton>
        </>
      ) : (
        <>
          <Flex $width={"100%"}>
            <PlainTitle>Подписаться на тег</PlainTitle>
            <Slider $height={100} $wrap={true}>
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={subscriptionToTags} />
              )}
            </Slider>

            <Cat />
          </Flex>

          <CustomButton
            onClick={handleSubscriptionTag}
            $style={"blue"}
            $width={"70%"}
          >
            Готово
          </CustomButton>
        </>
      )}
    </ModalWindow>
  );
};

export default AddTag;
