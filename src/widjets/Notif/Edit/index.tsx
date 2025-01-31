import React, { useState, useEffect } from "react";
import { Form, Textarea } from "../style.ts";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  Loader,
} from "../../../shared/ui/";
import Calendar from "../../Calendar/index.tsx";
import { useTagStore, TagList, ITag } from "../../../entities/tag/index.ts";
import { Arrow, Plus, ComplitedSvg } from "../../../shared/ui/Icon/index.tsx";
import { AddTag } from "../../Tag";
import { editNotif, INotif } from "../../../entities/notification/index.ts";
import { AddFile } from "../../../shared/ui/AddFile/index.tsx";
import { isMobile } from "../../../shared/config/index.ts";
import { IFile } from "../../../shared/types";
import { toast } from "react-toastify";

interface EditNotifProps {
  notifData: INotif;
}

export const EditNotif: React.FC<EditNotifProps> = ({ notifData }) => {
  const { selectedEditTags, setSelectedEditTags } = useTagStore();

  // Состояния для формы
  const [title, setTitle] = useState<INotif["title"]>("");
  const [description, setDescription] = useState<INotif["description"]>("");
  const [mediaFiles, setMediaFiles] = useState<IFile[]>([]);
  const [date, setDate] = useState<INotif["time"]>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast(<ComplitedSvg />);

  // Заполнение формы данными из notifData
  useEffect(() => {
    if (notifData) {
      setTitle(notifData.title || "");
      setDescription(notifData.description || "");
      setDate(notifData.time || null);
      setSelectedEditTags(notifData.tags || []);
      setMediaFiles(notifData.files || []);
    }
  }, [notifData, setSelectedEditTags]);

  // Сброс формы
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaFiles([]);
    setDate(null);
    setSelectedEditTags([]);
  };

  // Обработчик отправки формы
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Валидация
    if (title.length > 100) {
      setError("Название должно быть не длиннее 40 символов");
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

    if (!title || !description || !date || selectedEditTags.length === 0) {
      setError("Заполните все поля");
      setIsLoading(false);
      return;
    }

    const tagIds: ITag["id"][] = selectedEditTags.map((tag) => tag.id);

    try {
      if (notifData) {
        await editNotif(
          notifData.id,
          title,
          description,
          mediaFiles,
          tagIds,
          date
        );
      } else {
        setError("Ошибка редактирования");
      }

      // Успешное завершение
      setError(null);
      resetForm();
      setIsLoading(false);

      // Убираем модалку через несколько секунд
      setTimeout(() => {
        // closeModal("Complited");
      }, 3000);
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      setError("Не удалось отправить");
      setIsLoading(false);
    }
  };

  if (error) {
    toast.error(error);
  }
  return (
    <Form onSubmit={handleEdit}>
      <Flex>
        <PlainTitle>Название</PlainTitle>
        <Container $border={16} $width={isMobile ? "100%" : "80%"}>
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
        <AddFile onFilesChange={setMediaFiles} files={mediaFiles} />
      </Flex>

      <Flex>
        <PlainTitle>Получатели</PlainTitle>
        <Flex $direction={"row"} $align={"center"} $gap={10}>
          <TagList initialTags={selectedEditTags} />

          <CustomButton onClick={notify} type="button" $style="blue">
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
              value={date ? new Date(date * 1000) : null} // не пон зачем умножать на 1000 или отправлять null,
              //  можно же просто положить date по типам норм выйдет
            />
          </Container>

          <CustomButton type="submit" $style={"blue"}>
            Редактировать
            {isLoading ? <Loader size={"23px"} /> : <Arrow />}
          </CustomButton>
        </Flex>
      </Flex>
    </Form>
  );
};
