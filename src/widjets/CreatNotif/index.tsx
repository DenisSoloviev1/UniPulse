import React, { useState } from "react";
import { Form, Textarea } from "./style.ts";
import {
  Container,
  Flex,
  CustomButton,
  MediaItem,
  PlainTitle,
} from "../../shared/ui/index.ts";
import Calendar from "../Calendar/index.tsx";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store.ts";
import { useTagStore } from "../../entities/tag/index.ts";
import { TagList } from "../../entities/tag/index.ts";
import { ArrowSvg } from "../../shared/ui/Icon/index.tsx";
import AddTag from "../AddTag/index.tsx";

const CreatNotif: React.FC = () => {
  const openModal = useAddTagStore((state) => state.open);
  const { selectedTags } = useTagStore();

  // Состояния для формы
  const [title, setTitle] = useState<string>(""); // Название уведомления
  const [text, setText] = useState<string>(""); // Текст уведомления
  const [mediaFiles, setMediaFiles] = useState<{ fileName: string; fileSize: number; data: string }[]>([]); // Медиафайлы (в формате base64 с дополнительными полями)
  const [date, setDate] = useState<number | null>(null); // Дата отправки (в timestamp)

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем наличие данных
    if (!title || !text || !date || selectedTags.length === 0) {
      alert("Заполните все поля!");
      return;
    }

    // Формируем данные для отправки
    const requestData = {
      name: title,
      time: date,
      description: text,
      files: mediaFiles, // Передаем файлы с дополнительными полями
      tags: selectedTags.map((tag) => tag.id), // ID тегов
    };

    // Получение токена из localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("Токен авторизации не найден.");
      return;
    }

    // Запрос к серверу
    try {
      const response = await fetch("https://ddt.donstu.ru/notif/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestData), // Отправляем данные как JSON
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      alert("Уведомление успешно отправлено!");
    } catch (error) {
      console.error("Ошибка при отправке уведомления:", error);
      alert("Не удалось отправить уведомление.");
    }
  };

  // Обработчик для файлов
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePromises = Array.from(files).map((file) =>
          new Promise<{ fileName: string; fileSize: number; data: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Чтение файла как base64
              resolve({
                fileName: file.name,
                fileSize: file.size,
                data: reader.result as string,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file); // Чтение файла как base64
          })
      );

      Promise.all(filePromises)
          .then((base64Files) => setMediaFiles(base64Files)) // Обновляем состояние с файлами в нужном формате
          .catch((error) => console.error("Ошибка при чтении файлов:", error));
    }
  };

  return (
      <Form onSubmit={handleSubmit}>
        <Flex>
          <PlainTitle>Название уведомления</PlainTitle>
          <Container $border={16} $width={"100%"}>
            <Textarea
                placeholder="Введите название"
                rows={2}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            ></Textarea>
          </Container>
        </Flex>

        <Flex>
          <PlainTitle>Текст уведомления</PlainTitle>
          <Container $border={16} $width={"100%"}>
            <Textarea
                placeholder="Введите текст"
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></Textarea>
          </Container>
        </Flex>

        <Flex>
          <PlainTitle>Прикрепленные медиа</PlainTitle>
          <input type="file" multiple onChange={handleFileChange} /> {/* Добавлено поле для выбора файлов */}
        </Flex>

        <Flex>
          <PlainTitle>Получатели</PlainTitle>

          <Flex>
            <TagList initialTags={selectedTags} />

            <CustomButton type={"button"} $style={"blue"} onClick={openModal}>
              +
            </CustomButton>

            <AddTag />
          </Flex>
        </Flex>

        <Flex>
          <PlainTitle>Дата отправки</PlainTitle>

          <Flex $direction={"row"}>
            <Container $border={16}>
              <Flex $direction={"row"}>
                <Calendar onChange={(newDate) => setDate(newDate)} />
              </Flex>
            </Container>

            <CustomButton type={"submit"} $style={"blue"}>
              Отправить <ArrowSvg />
            </CustomButton>
          </Flex>
        </Flex>
      </Form>
  );
};

export default CreatNotif;
