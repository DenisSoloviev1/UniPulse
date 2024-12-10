import React, { useState } from "react";
import { Error, Form, Textarea } from "../style.ts";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Loader,
} from "../../../shared/ui/";
import Calendar from "../../Calendar/index.tsx";
import { useModalStore } from "../../../shared/ui/ModalWindow/store.ts";
import { useTagStore, TagList, ITag } from "../../../entities/tag/index.ts";
import { Arrow, Plus, ComplitedSvg } from "../../../shared/ui/Icon/index.tsx";
import { AddTag } from "../../Tag";
import { creatNotif, INotif } from "../../../entities/notification/index.ts";
import { AddFile } from "../../../shared/ui/AddFile/index.tsx";
import { isMobile } from "../../../shared/config";
import { IFile } from "../../../shared/types";

export const CreatNotif: React.FC = () => {
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isComplited = useModalStore((state) => state.isOpen("Complited"));

  const { selectedTags, setSelectedTags } = useTagStore();

  // Состояния для формы
  const [title, setTitle] = useState<INotif["title"]>("");
  const [description, setDescription] = useState<INotif["description"]>("");
  const [mediaFiles, setMediaFiles] = useState<IFile[]>([]);
  const [date, setDate] = useState<INotif["time"]>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Сброс формы
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFiles([]);
    setDate(null);
    setSelectedTags([]);
  };

  // Обработчик отправки формы
  const handleCreat = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Валидация
    if (title.length > 60) {
      setError("Название должно быть не длиннее 60 символов");
      setIsLoading(false);
      return;
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
      setError(null);
      openModal("Complited");
      resetForm();
      setIsLoading(false);

      // Убираем модалку через несколько секунд
      setTimeout(() => {
        closeModal("Complited");
      }, 3000);
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      setError("Не удалось отправить");
      setIsLoading(false)
    }
  };

  return (
    <Form onSubmit={handleCreat}>
      <Flex>
        <PlainTitle>Название</PlainTitle>
        <Container $border={16} $width={isMobile ? "100%" : "50%"}>
          <Textarea
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Container>
      </Flex>

      <Flex>
        <PlainTitle>Текст</PlainTitle>
        <Container $border={16} $width={"100%"}>
          <Textarea
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Container>
      </Flex>

      <Flex>
        <PlainTitle>Прикрепленные медиа</PlainTitle>
        <AddFile onFilesChange={setMediaFiles} files={mediaFiles}/>
      </Flex>

      <Flex>
        <PlainTitle>Получатели</PlainTitle>
        <Flex $direction={"row"} $align={"center"} $gap={10}>
          <TagList initialTags={selectedTags} />
          <CustomButton
            type="button"
            $style="blue"
            onClick={() => openModal("AddTag")}
          >
            <Plus />
          </CustomButton>
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
            {isLoading ? <Loader size={"23px"}/> : <Arrow />}
          </CustomButton>
        </Flex>

        {error && <Error>{error}</Error>}

        <ModalWindow show={isComplited} onClick={() => closeModal("Complited")}>
          <ComplitedSvg />
        </ModalWindow>
      </Flex>
    </Form>
  );
};
