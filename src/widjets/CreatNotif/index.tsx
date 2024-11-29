import React, { useState, useEffect } from "react";
import { Error, Form, Textarea } from "./style.ts";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
} from "../../shared/ui/index.ts";
import Calendar from "../Calendar";
import { useModalStore } from "../../shared/ui/ModalWindow/store.ts";
import { useTagStore, TagList, ITag } from "../../entities/tag";
import { Arrow, Plus, ComplitedSvg } from "../../shared/ui/Icon";
import AddTag from "../AddTag/index.tsx";
import { addNotif, editNotif, INotif } from "../../entities/notification";
import { MediaItem } from "../../shared/ui/MediaItem";
import { isMobile } from "../../shared/config/";

interface CreateNotifProps {
  notifData?: INotif; // Добавлен пропс для получения данных уведомления
}

const CreateNotif: React.FC<CreateNotifProps> = ({ notifData }) => {
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isComplited = useModalStore((state) => state.isOpen("Complited"));

  const { selectedTags, setSelectedTags } = useTagStore();

  // Состояния для формы
  const [title, setTitle] = useState<INotif["title"]>("");
  const [description, setDescription] = useState<INotif["description"]>("");
  const [mediaFiles, setMediaFiles] = useState<
      Array<{ fileName: string; fileSize: number; data: string }>
  >([]);
  const [date, setDate] = useState<INotif["time"]>(null);
  const [error, setError] = useState<string | null>(null);

  // Заполнение формы данными из notifData
  useEffect(() => {
    if (notifData) {
      setTitle(notifData.title);
      setDescription(notifData.description);
      setDate(notifData.time ? new Date(notifData.time * 1000) : null);
      setSelectedTags(notifData.tags);
      setMediaFiles(notifData.files || []);
    }
  }, [notifData, setSelectedTags]);

  // Сброс формы
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFiles([]);
    setDate(null);
    setSelectedTags([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Валидация длины заголовка
    if (title.length > 40) {
      setError("Название уведомления должно быть не длиннее 40 символов");
      return;
    }

    // Валидация длины описания
    if (description.length > 300) {
      setError("Текст уведомления должен быть не длиннее 300 символов");
      return;
    }

    // Валидация количества файлов
    if (mediaFiles.length > 10) {
      setError("Можно прикрепить не более 10 файлов");
      return;
    }

    // Проверка заполненности остальных полей
    if (!title || !description || !date || selectedTags.length === 0) {
      setError("Заполните все поля");
      return;
    }

    const tagIds: ITag["id"][] = selectedTags.map((tag) => tag.id);

    try {
      // Проверяем тип date и если это timestamp, преобразуем в Date
      let dateProcessed = null;
      if (typeof date === "number") {
        // Если date - это timestamp (число), создаем объект Date
        const dateObj = new Date(date * 1000); // Умножаем на 1000, чтобы преобразовать в миллисекунды
        if (!isNaN(dateObj.getTime())) {
          dateProcessed = Math.floor(dateObj.getTime() / 1000); // Преобразуем обратно в timestamp (секунды)
        } else {
          setError("Некорректная дата.");
          return;
        }
      } else if (date instanceof Date && !isNaN(date.getTime())) {
        // Если date - это объект Date, обрабатываем его
        dateProcessed = Math.floor(date.getTime() / 1000);
      } else {
        setError("Некорректная дата.");
        return;
      }

      if (notifData) {
        // Если notifData есть, вызываем функцию редактирования
        await editNotif(
            notifData.id,
            title,
            description,
            mediaFiles,
            tagIds,
            dateProcessed
        );
      } else {
        // Если нет, создаем новое уведомление
        await addNotif(title, description, mediaFiles, tagIds, dateProcessed);
      }

      // Успешное завершение
      setError(null);
      openModal("Complited");
      resetForm();

      // Убираем модалку через несколько секунд
      setTimeout(() => {
        closeModal("Complited");
      }, 3000);
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      setError("Не удалось отправить уведомление");
      closeModal("Complited");
    }
  };



  return (
      <Form onSubmit={handleSubmit}>
        <Flex $gap={10}>
          <PlainTitle>Название уведомления</PlainTitle>
          <Container $border={16} $width={isMobile ? "100%" : "50%"}>
            <Textarea
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></Textarea>
          </Container>
        </Flex>

        <Flex $gap={10}>
          <PlainTitle>Текст уведомления</PlainTitle>
          <Container $border={16} $width={"100%"}>
            <Textarea
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></Textarea>
          </Container>
        </Flex>

        <Flex $gap={10}>
          <PlainTitle>Прикрепленные медиа</PlainTitle>
          <MediaItem onFilesChange={setMediaFiles} />
        </Flex>

        <Flex $gap={10}>
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

        <Flex $gap={10}>
          <PlainTitle>Дата отправки</PlainTitle>
          <Flex $direction={isMobile ? "column" : "row"} $gap={10}>
            <Container $border={16}>
              <Calendar onChange={(newDate) => setDate(newDate)} value={date ? new Date(date * 1000) : null} />
            </Container>

            <CustomButton type="submit" $style={"blue"}>
              Отправить <Arrow />
            </CustomButton>
          </Flex>

          {error && <Error>{error}</Error>}

          <ModalWindow show={isComplited} onClick={() => closeModal("Complited")}>
            <Flex $direction="column" $align="center" $gap={15}>
              <ComplitedSvg />
            </Flex>
          </ModalWindow>
        </Flex>
      </Form>
  );
};

export default CreateNotif;
