import React, { useState, useEffect } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { SubscribeTag } from "../../widjets/Tag";
import { Flex, CustomButton, PlainTitle, Skeleton } from "../../shared/ui";
import { SocialWeb } from "../style";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import {
  NotifList,
  useNotifStore,
  getNotifs,
} from "../../entities/notification";
import {
  useSubscriptionStore,
  getSubscriptions,
  SubscriptionList,
} from "../../entities/subscription";
import { Plus, TelegramSvg, VKSvg } from "../../shared/ui/Icon";
import { useAuthStore } from "../../entities/auth";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";

import { RolesDict, Routes } from "../../shared/types";

export const MyNotif: React.FC = () => {
  const navigate = useNavigate();

  const { subscriptionNotifs, setSubscriptionNotifs } = useNotifStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openModal = useModalStore((state) => state.open);

  const { setSubscriptions } = useSubscriptionStore();
  const { userId, isAuth } = useAuthStore(); // Используем стор для получения userId

  // Функция для выполнения запроса
  const addTelegram = async (id: string) => {
    try {
      const result = await addTelegramChannel(id);
      if (result.success) {
        // Если сервер вернул положительный ответ
        navigate(Routes.MYNOTIF);
      }
    } catch (error) {
      console.error("Ошибка при добавлении канала:", error);
    }
  };

  // Запрос на добавление канала, если userId в сторе присутствует
  useEffect(() => {
    if (isAuth && userId) {
      addTelegram(userId);
    }
  }, [isAuth, userId]);

  //получение тегов, на которые подписан
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const responseData = await getSubscriptions();
        setSubscriptions(responseData);
      } catch (error) {
        console.error("Ошибка загрузки подписок:", error);
      }
    };

    fetchSubscriptions();
  }, [setSubscriptions]);

  //запрос на получение уведомлений по подписке как пользователь
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const responseData = await getNotifs(RolesDict.USER);
        setSubscriptionNotifs(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      }
    };
    fetchNotifs();
  }, [setSubscriptionNotifs]);

  return (
    <>
      <Header />
      <Main>
        <Flex $gap={20}>
          <Flex $gap={10}>
            <PlainTitle>Бот для рассылки</PlainTitle>

            <Flex $direction={"row"} $gap={20}>
              <SocialWeb href="https://t.me/unipulse_dstu_bot" target="_blanck">
                <TelegramSvg />
              </SocialWeb>

              <SocialWeb href="/" target="_blanck">
                <VKSvg />
              </SocialWeb>
            </Flex>
          </Flex>

          <Flex $gap={10}>
            <PlainTitle>Мои подписки</PlainTitle>

            <Flex $direction={"row"} $align={"center"} $gap={10}>
              <SubscriptionList />

              <CustomButton
                type={"button"}
                $style={"blue"}
                onClick={() => openModal("SubscribeTag")}
              >
                <Plus />
              </CustomButton>

              <SubscribeTag />
            </Flex>
          </Flex>
        </Flex>

        <Flex $gap={10} $width={"100%"}>
          <PlainTitle>Полученные пульсы</PlainTitle>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} $height="150px" />
            ))
          ) : (
            <NotifList
              role={RolesDict.USER}
              initialNotifs={subscriptionNotifs}
            />
          )}
        </Flex>
      </Main>
    </>
  );
};
