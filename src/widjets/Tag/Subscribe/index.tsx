import React, { useState, useEffect } from "react";
import {
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
  Loader,
  Skeleton,
} from "../../../shared/ui";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { TagList } from "../../../entities/tag";
import { Cat, ComplitedSvg } from "../../../shared/ui/Icon";
import { useTagStore, getSubscriptionToTags } from "../../../entities/tag";
import { subscribeToTag } from "../../../entities/subscription";
import { Error } from "../../Notif/style";
export const SubscribeTag: React.FC = () => {
  const closeModal = useModalStore((state) => state.close);
  const isOpenSubscribeTag = useModalStore((state) =>
    state.isOpen("SubscribeTag")
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    subscriptionToTags,
    selectedTags,
    setSubscriptionToTags,
    setSelectedTags,
  } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getSubscriptionToTags();
        setSubscriptionToTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  const handleSubscriptionTag = async () => {
    setIsLoading(true);

    if (selectedTags.length === 0) {
      setError("Не выбран ни один тег");
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
        closeModal("SubscribeTag");
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Ошибка подписки на тег:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWindow
      show={isOpenSubscribeTag}
      onClick={() => closeModal("SubscribeTag")}
    >
      {isSuccess ? (
        <ComplitedSvg />
      ) : (
        <>
          <Flex $width={"100%"}>
            <PlainTitle>Доступные теги</PlainTitle>
            <Slider $height={100} $wrap={true}>
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={subscriptionToTags} />
              )}
            </Slider>
          </Flex>

          <Cat />

          <Flex $align={"center"} $width={"100%"}>
            <CustomButton
              onClick={handleSubscriptionTag}
              $style={"blue"}
              $width={"70%"}
            >
              {isLoading ? <Loader size={"23px"} /> : "Подписаться"}
            </CustomButton>

            {error && <Error>{error}</Error>}
          </Flex>
        </>
      )}
    </ModalWindow>
  );
};
