import React, { useState, useEffect } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { SubscribeTag } from "../../widjets/Tag";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  Skeleton,
} from "../../shared/ui";
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
import { Plus } from "../../shared/ui/Icon";
import { useAuthStore } from "../../entities/auth";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";

import { RolesDict } from "../../shared/types";

export const MyNotif: React.FC = () => {
  const navigate = useNavigate();

  const { subscriptionNotifs, setSubscriptionNotifs } = useNotifStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openModal = useModalStore((state) => state.open);

  const { setSubscriptions } = useSubscriptionStore();
  const { userId, isAuth } = useAuthStore(); // Используем стор для получения userId

  const [selectedPlatform, setSelectedPlatform] = useState<string>("профиля");
  const [inputUserId, setUserId] = useState<string>("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  // Функция для выполнения запроса, если есть userId
  const addTelegram = async (id: string) => {
    try {
      const result = await addTelegramChannel(id);
      console.log("Успех:", result);
      if (result.success) {
        // Если сервер вернул положительный ответ
        navigate("/myNotif");
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
        console.log("Загруженные подписки:", responseData);
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
        console.log("Загруженные уведомления:", responseData);
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

            <Flex $direction={"row"}>
              <Container $noActive={true}>
                <label>
                  <input
                    type="radio"
                    value="vk"
                    checked={selectedPlatform === "vk"}
                    // onChange={handlePlatformChange}
                  />
                  Вконтакте
                </label>
              </Container>

              <Container>
                <label>
                  <input
                    type="radio"
                    value="telegram"
                    checked={selectedPlatform === "telegram"}
                    onChange={handlePlatformChange}
                  />
                  Телеграм
                </label>
              </Container>
            </Flex>

            <Container>
              <input
                type="text"
                placeholder={`Введите ID ${selectedPlatform}`}
                value={inputUserId}
                onChange={handleUserIdChange}
              />
            </Container>
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
            <NotifList role={RolesDict.USER} initialNotifs={subscriptionNotifs} />
          )}
        </Flex>
      </Main>
    </>
  );
};
