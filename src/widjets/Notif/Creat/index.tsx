import React, { InputHTMLAttributes, useState } from "react";
import { Form, Textarea } from "../style.ts";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  Loader,
  Slider,
  Skeleton,
} from "../../../shared/ui/";
import Calendar from "../../Calendar/index.tsx";
import { useTagStore, TagList, ITag } from "../../../entities/tag/index.ts";
import { Arrow, Plus, ComplitedSvg } from "../../../shared/ui/Icon/index.tsx";
import { AddTag } from "../../Tag";
import { creatNotif, INotif } from "../../../entities/notification/index.ts";
import { AddFile } from "../../../shared/ui/AddFile/index.tsx";
import { isMobile } from "../../../shared/config";
import { IFile, RolesDict } from "../../../shared/types";
import { Modal } from "../../../shared/ui/ModalWindow/indexNew.tsx";
import { ModalContent } from "../../../shared/ui/ModalWindow/style.ts";
import { useCreateTag } from "../../../shared/hooks/useCreateTag.tsx";
import { InputText } from "../../../shared/ui/InputText/InputText.tsx";
import { useAuthStore } from "../../../entities/auth/index.ts";
import { useFetchTags } from "../../../shared/hooks/useFetchTags.ts";
import { toast } from "react-toastify";

export const useSendForm = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { selectedTags, setSelectedTags } = useTagStore();

  // Состояния для формы
  const [title, setTitle] = useState<INotif["title"]>("");
  const [description, setDescription] = useState<INotif["description"]>("");
  const [mediaFiles, setMediaFiles] = useState<IFile[]>([]);
  const [date, setDate] = useState<INotif["time"]>(null);

  const notify = () => toast(<ComplitedSvg />);
  // Сброс формы
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFiles([]);
    setDate(null);
    setSelectedTags([]);
  };

  const handleCreat = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Валидация
    if (title.length > 100) {
      setError("Название должно быть не длиннее 60 символов"); // тут написано 60 выше 100, и такие числа лучше выносить в переменные
      setIsLoading(false);
      return; // вместо ретернов можно к следущему if добавить else (else if)
    }

    if (
      (mediaFiles && description.length > 1000) ||
      description.length > 4000
    ) {
      setError("Текст слишком длинный");
      setIsLoading(false);
      return;
    }

    if (mediaFiles.length > 10) {
      setError("Можно прикрепить не более 10 файлов");
      setIsLoading(false);
      return;
    }

    if (!title || !description || !date || selectedTags.length === 0) {
      setError("Заполните все поля");
      setIsLoading(false);
      return;
    }

    const tagIds: ITag["id"][] = selectedTags.map((tag) => tag.id);

    try {
      await creatNotif(title, description, mediaFiles, tagIds, date);

      // Успешное завершение
      setError("");
      notify();
      resetForm();
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      setError("Не удалось отправить");
      setIsLoading(false);
    } // вынести в отдельный хук и из него возвращать функцию
  };

  return {
    handleCreat,
    error,
    isLoading,
    setDate,
    setMediaFiles,
    setDescription,
    setTitle,
    description,
    mediaFiles,
    date,
  };
};

type FlexInputProps = {
  title: string;
  rows?: number;
} & InputHTMLAttributes<HTMLTextAreaElement>;

const FlexInput: React.FC<FlexInputProps> = ({ rows = 1, title, ...props }) => {
  return (
    <Flex>
      <PlainTitle>{title}</PlainTitle>
      <Container $border={16} $width={isMobile ? "100%" : "50%"}>
        <Textarea rows={rows} {...props} />
      </Container>
    </Flex>
  );
};

export const CreatNotif = () => {
  const { selectedTags } = useTagStore();

  const [tagName, setTagName] = useState("");

  const { role } = useAuthStore();
  const { data: tags, isLoadingTags } = useFetchTags();

  // const { tags } = useTagStore();

  const {
    error,
    handleCreat,
    isLoading,
    setDate,
    setDescription,
    setMediaFiles,
    setTitle,
    mediaFiles,
    description,
    date,
  } = useSendForm();

  const {
    error: errorCreatTag,
    handleCreateTag,
    isLoading: isLoadingCreateTag,
    isSuccess,
  } = useCreateTag(description, tagName);

  if (error) {
    toast.error(error);
  }
  if (errorCreatTag) {
    toast.error(errorCreatTag);
  }
  return (
    <Form onSubmit={handleCreat}>
      <FlexInput title="Название" onChange={(e) => setTitle(e.target.value)} />
      <FlexInput
        title="Текст"
        rows={10}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Flex>
        <PlainTitle>Прикрепленные медиа</PlainTitle>
        <AddFile onFilesChange={setMediaFiles} files={mediaFiles} />
      </Flex>

      <Flex>
        <PlainTitle>Получатели</PlainTitle>
        <Flex $direction={"row"} $align={"center"} $gap={10}>
          <TagList initialTags={selectedTags} />

          <Modal
            renderProp={() => (
              <ModalContent onClick={(e) => e.stopPropagation()}>
                {isSuccess ? (
                  <ComplitedSvg />
                ) : (
                  <>
                    <Flex>
                      <PlainTitle>Существующие теги</PlainTitle>
                      <Slider
                        $height={role === RolesDict.MEDIA ? "200px" : undefined}
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
                          <InputText
                            type="text"
                            placeholder="название"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                          />
                          <InputText
                            type="text"
                            placeholder="описание"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Flex>

                        <Flex $width={"100%"} $align={"center"}>
                          <CustomButton
                            type={"button"}
                            onClick={handleCreateTag}
                            $style={"blue"}
                            $width={"70%"}
                          >
                            {isLoadingCreateTag ? (
                              <Loader size={"23px"} />
                            ) : (
                              "Создать"
                            )}
                          </CustomButton>
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}
              </ModalContent>
            )}
          >
            <CustomButton
              type="button"
              $style="blue"
              onClick={(e) => e.preventDefault()}
            >
              <Plus />
            </CustomButton>
          </Modal>

          <AddTag />
        </Flex>
      </Flex>

      <Flex>
        <PlainTitle>Дата отправки</PlainTitle>
        <Flex $direction={isMobile ? "column" : "row"} $gap={10}>
          <Container $border={16}>
            <Calendar
              onChange={(newDate) => setDate(newDate)}
              value={date ? new Date(date * 1000) : null}
            />
          </Container>

          <CustomButton type="submit" $style={"blue"}>
            Отправить
            {isLoading ? <Loader size={"23px"} /> : <Arrow />}
          </CustomButton>
        </Flex>
      </Flex>
    </Form>
  );
};
