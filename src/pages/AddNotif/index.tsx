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
import { RolesDict } from "../../shared/types";

export const AddNotif: React.FC = () => {
  const { notifs, setNotifs } = useNotifStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const responseData = await getNotifs(RolesDict.CREATOR);
        setNotifs(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      }
    };
    fetchNotifs();
  }, [getNotifs]);

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
            <NotifList initialNotifs={notifs} role={RolesDict.CREATOR} />
          )}
        </Flex>
      </Main>
    </>
  );
};
