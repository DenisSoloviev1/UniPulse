import { useState } from "react";
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
import { useTagStore } from "../../../entities/tag";
import { Error } from "../../Notif/style";
import { useAuthStore } from "../../../entities/auth";
import { RolesDict } from "../../../shared/types";
import { useFetchTags } from "../../../shared/hooks/useFetchTags";

export const AddTag = () => {
  const { role } = useAuthStore();
  const [tagName, setTagName] = useState(""); // лишняя типизация
  const [tagDescription, setTagDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const { isLoadingTags } = useFetchTags();

  const closeModal = useModalStore((state) => state.close);
  const isOpenAddTag = useModalStore((state) => state.isOpen("AddTag"));

  const { tags } = useTagStore();

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
  }; // надо вынести и переписать логику на react hook form

  return (
    <ModalWindow show={isOpenAddTag} onClick={() => closeModal("AddTag")}>
      {isSuccess ? (
        <ComplitedSvg />
      ) : (
        <>
          <Flex>
            <PlainTitle>Существующие теги</PlainTitle>
            <Slider
              $height={role === RolesDict.MEDIA ? 100 : null}
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

          {role === RolesDict.MEDIA && (
            <Flex $width={"100%"} $gap={15}>
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
                  {/* вынести в компонент */}
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

                {error && <Error>{error}</Error>}
              </Flex>
            </Flex>
          )}
        </>
      )}
    </ModalWindow>
  );
};
