import React, { useEffect, useState } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { CreatNotif } from "../../widjets/Notif";
import {
  NotifList,
  getNotifs,
  useNotifStore,
} from "../../entities/notification";
import { Flex, PlainTitle, Skeleton } from "../../shared/ui";
import { useAuthStore } from "../../entities/auth";
import { RolesDict } from "../../shared/types";

export const AddNotif: React.FC = () => {
  const { role } = useAuthStore();

  const { notifs, setFetchNotifs } = useNotifStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const responseData = await getNotifs(RolesDict.CREATOR);
        setFetchNotifs(responseData);
        setIsLoading(false);
        console.log("Загруженные уведомления:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      }
    };
    fetchNotifs();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <CreatNotif />

        <Flex $gap={10} $width={"100%"}>
          <PlainTitle>Отправленные пульсы</PlainTitle>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} $height="150px" />
            ))
          ) : (
            <NotifList initialNotifs={notifs} role={role} />
          )}
        </Flex>
      </Main>
    </>
  );
};
