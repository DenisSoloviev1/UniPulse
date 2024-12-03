import React, { useState, useEffect } from "react";
import {
  Container,
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
import { addTag } from "../../../entities/tag";
import { ComplitedSvg } from "../../../shared/ui/Icon";
import { useTagStore, getTags } from "../../../entities/tag";
import { Error } from "../../Notif/style";

export const AddTag: React.FC = () => {
  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const closeModal = useModalStore((state) => state.close);
  const isOpenAddTag = useModalStore((state) => state.isOpen("AddTag"));

  const { tags, setTags } = useTagStore();

  useEffect(() => {

    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getTags();
        setTags(responseData);
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

  return (
    <ModalWindow show={isOpenAddTag} onClick={() => closeModal("AddTag")}>
      {isLoading ? (
        <Loader size={"300px"} color={"blue"} />
      ) : isSuccess ? (
        <ComplitedSvg />
      ) : (
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
      )}
    </ModalWindow>
  );
};
