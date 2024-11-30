import React, { useEffect, useState } from "react";
import {
  Flex,
  Skeleton,
  PlainTitle,
  ModalWindow,
  Slider,
} from "../../../shared/ui";
import { Notif } from "../";
import { INotif, useNotifStore } from "../model";
import { getNotifs } from "../api";
import { Roles, RolesDict } from "../../../shared/types";
import { MoreInfo, EditNotif } from "../../../widjets/Notif";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { isMobile } from "../../../shared/config";

interface NotifListProps {
  title: string;
  role?: Roles;
}

export const NotifList: React.FC<NotifListProps> = ({
  title,
  role = RolesDict.USER,
}) => {
  const {
    notifs,
    setFetchNotifs,
    subscriptionNotifs,
    setSubscriptionNotifs,
    selectNotif,
    setSelectNotif,
    selectEditNotif,
    setSelectEditNotif,
  } = useNotifStore();
  const [isLoadingNotifs, setIsLoadingNotifs] = useState<boolean>(true); // Состояние загрузки

  const closeModal = useModalStore((state) => state.close);
  const openModal = useModalStore((state) => state.open);
  const isOpenMoreInfo = useModalStore((state) =>
    state.isOpen(`Notif-${selectNotif?.id}`)
  );
  const isOpenEditNotif = useModalStore((state) =>
    state.isOpen(`Notif-${selectEditNotif?.id}`)
  );

  const initialNotifs: INotif[] =
    role === RolesDict.USER ? subscriptionNotifs : notifs;

  console.log(`isOpenMoreInfo ${isOpenMoreInfo}`);
  console.log(`isOpenEditNotif ${isOpenEditNotif}`);

  useEffect(() => {
    const fetchNotifs = async () => {
      setIsLoadingNotifs(true);
      try {
        const responseData = await getNotifs(role);
        role === RolesDict.USER
          ? setSubscriptionNotifs(responseData)
          : setFetchNotifs(responseData);
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
        ) : initialNotifs.length !== 0 ? (
          initialNotifs.map((notifItem) => (
            <Notif
              key={notifItem.id}
              id={notifItem.id}
              title={notifItem.title}
              description={notifItem.description}
              status={notifItem.status}
              files={notifItem.files}
              time={notifItem.time}
              tags={notifItem.tags}
              onClick={() => {
                const notif: INotif = {
                  id: notifItem.id,
                  title: notifItem.title,
                  description: notifItem.description,
                  time: notifItem.time,
                  tags: notifItem.tags,
                  status: notifItem.status,
                  files: notifItem.files,
                };
                role === RolesDict.USER
                  ? setSelectNotif(notif)
                  : setSelectEditNotif(notif);
                openModal(`Notif-${notifItem.id}`);
              }}
            />
          ))
        ) : (
          <p>уведомлений нет</p>
        )}
      </Flex>

      {role === RolesDict.USER ? (
        <ModalWindow
          onClick={() => closeModal(`Notif-${selectNotif?.id}`)}
          show={isOpenMoreInfo}
          width={isMobile ? "90%" : "50%"}
          height={isMobile ? "70%" : "90%"}
        >
          <Slider $padding={5}>
            <MoreInfo />
          </Slider>
        </ModalWindow>
      ) : (
        <ModalWindow
          onClick={() => closeModal(`Notif-${selectEditNotif?.id}`)}
          show={isOpenEditNotif}
          width={isMobile ? "90%" : "50%"}
          height={isMobile ? "70%" : "90%"}
        >
          <Flex $gap={10} $width={"100%"}>
            <PlainTitle style={{ fontSize: "30px", fontWeight: "500" }}>
              Редактирование
            </PlainTitle>

            <Slider $padding={5}>
              <EditNotif notifData={selectEditNotif} />
            </Slider>
          </Flex>
        </ModalWindow>
      )}
    </article>
  );
};
