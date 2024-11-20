import React, { useEffect, useState } from "react";
import { Flex, Skeleton, PlainTitle } from "../../../shared/ui";
import { Notif } from "./notification";
import { useNotifStore } from "../model";
import { getNotifs } from "../api";

interface NotifListProps {
  title: string;
}

export const NotifList: React.FC<NotifListProps> = ({ title }) => {
  const { notifs, setFetchNotifs } = useNotifStore();
  const [isLoadingNotifs, setIsLoadingNotifs] = useState<boolean>(true); // Состояние загрузки
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) return;

    // Функция для получения уведомлений
    const fetchNotifs = async () => {
      setIsLoadingNotifs(true);
      try {
        const responseData = await getNotifs();
        setFetchNotifs(responseData);
        console.log("Загруженные уведомления:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      } finally {
        setIsLoadingNotifs(false);
      }
    };

    fetchNotifs();
  }, []);

  return (
    <article style={{ width: "100%" }}>
      <Flex $direction="column" $gap={20}>
        <PlainTitle>{title}</PlainTitle>
        {isLoadingNotifs ? (
          Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} $height="100px" />
          ))
        ) : notifs.length !== 0 ? (
          notifs.map((notifItem) => (
            <Notif
              key={notifItem.id}
              title={notifItem.title}
              text={notifItem.text}
              id={notifItem.id}
              tags={notifItem.tags}
            />
          ))
        ) : (
          <p>уведомлений нет</p>
        )}
      </Flex>
    </article>
  );
};
