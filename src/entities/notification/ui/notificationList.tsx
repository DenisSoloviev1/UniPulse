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
      <Flex $gap={10}>
        <PlainTitle>{title}</PlainTitle>
        {isLoadingNotifs ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} $height="150px" />
          ))
        ) : notifs.length !== 0 ? (
          notifs.map((notifItem) => (
            <Notif
              key={notifItem.id}
              id={notifItem.id}
              title={notifItem.title}
              description={notifItem.description}
              status={notifItem.status}
              files={notifItem.files}
              time={notifItem.time}
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
