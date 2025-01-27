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
import { useAuthStore } from "../../../entities/auth";
import { RolesDict } from "../../../shared/types";
import { isMobile } from "../../../shared/config";

export const AddTag: React.FC = () => {
  const { role } = useAuthStore();
  const [tagName, setTagName] = useState<string>("");
  const [tagDescription, setTagDescription] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTags, setIsLoadingTags] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const closeModal = useModalStore((state) => state.close);
  const openModal = useModalStore((state) => state.open);
  const isOpenAddTag = useModalStore((state) => state.isOpen("AddTag"));
  const isOpenError = useModalStore((state) => state.isOpen("Error"));

  const { tags, setTags } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getTags();
        setTags(responseData);
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
        openModal("Error");
        return;
      }
      await addTag(tagName, tagDescription);

      // Очистка формы и показ успеха
      setTagDescription("");
      setTagName("");
      setIsSuccess(true);
      setError("");
      closeModal("Error");

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
    <ModalWindow
      show={isOpenAddTag}
      onClick={() => closeModal("AddTag")}
      height={isMobile ? "auto" : "490px"}
    >
      {isSuccess ? (
        <ComplitedSvg />
      ) : (
        <>
          <Flex>
            <PlainTitle>Существующие теги</PlainTitle>
            <Slider
              $height={role === RolesDict.MEDIA ? 200 : null}
              $wrap={true}
            >
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={tags} />
              )}
            </Slider>
          </Flex>

          {role === RolesDict.MEDIA ? (
            <Flex $width={"100%"} $gap={30}>
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
              </Flex>

              <Flex $width={"100%"} $align={"center"}>
                <CustomButton
                  type={"button"}
                  onClick={handleCreateTag}
                  $style={"blue"}
                  $width={"70%"}
                >
                  {isLoading ? <Loader size={"23px"} /> : "Создать"}
                </CustomButton>

                {error && (
                  <ModalWindow
                    onClick={() => closeModal("Error")}
                    show={isOpenError}
                    position={["", "", "30px", ""]}
                    width={"250px"}
                    height={"auto"}
                  >
                    <Error>{error}</Error>
                  </ModalWindow>
                )}
              </Flex>
            </Flex>
          ) : (
            <></>
          )}
        </>
      )}
    </ModalWindow>
  );
};
