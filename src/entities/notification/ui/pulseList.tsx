import React, { useEffect, useState } from "react";
import { Flex, PlainTitle } from "../../../shared/ui";
import { Pulse } from "./pulse";
import { INotif } from "../model";

// Интерфейс для тега
interface ITag {
  id: number;
  name: string;
  description: string;
  subscriptable: boolean;
}

// Интерфейс для уведомления
interface INotif {
  id: number;
  title: string;
  text: string;
  tags: ITag[];
}

interface PulseListProps {
  title: string;
}

export const PulseList: React.FC<PulseListProps> = ({ title }) => {
  const [arrayPulse, setArrayPulse] = useState<INotif[]>([]); // Состояние для уведомлений
  const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  useEffect(() => {
    // Функция для получения токена из localStorage
    const getAuthToken = () => localStorage.getItem("authToken");

    // Функция для получения уведомлений
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      const authToken = getAuthToken();
      if (!authToken) {
        setError("Токен авторизации не найден.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://ddt.donstu.ru/notif/api/notifications/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json(); // Предположим, что бэкенд возвращает массив уведомлений
        console.log('data', data)
        const notifications: INotif[] = data.data.map((notif: any) => ({
          id: notif.id,
          title: notif.name,
          text: notif.description,
          tags: notif.tags.map((tagId: number) => ({
            id: tagId,
            name: `Тег ${tagId}`, // Здесь можно доработать для получения полного объекта тега
            description: `Описание для тега ${tagId}`, // Если потребуется больше данных о тегах
            subscriptable: true, // Примерное значение
          })),
        }));

        setArrayPulse(notifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
      <article style={{ width: "100%" }}>
        <Flex $direction="column" $gap={20}>
          <PlainTitle>{title}</PlainTitle>
          {loading ? (
              <p>Загрузка...</p>
          ) : error ? (
              <p style={{ color: "red" }}>Ошибка: {error}</p>
          ) : arrayPulse.length > 0 ? (
              arrayPulse.map((pulseItem) => (
                  <Pulse
                      key={pulseItem.id}
                      title={pulseItem.title}
                      text={pulseItem.text}
                      id={pulseItem.id}
                      tags={pulseItem.tags}
                  />
              ))
          ) : (
              <p>Нет уведомлений</p>
          )}
        </Flex>
      </article>
  );
};
