import React, { useState, useEffect } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { SubscribeTag } from "../../widjets/Tag";
import {
  Container,
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
} from "../../shared/ui";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { NotifList, useNotifStore } from "../../entities/notification";
import {
  useSubscriptionStore,
  getSubscriptions,
  SubscriptionList,
} from "../../entities/subscription";
import { Plus } from "../../shared/ui/Icon";
import { useAuthStore } from "../../entities/auth";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import { MoreInfo } from "../../widjets/Notif";
import { isMobile } from "../../shared/config";

export const MyNotif: React.FC = () => {
  const navigate = useNavigate();

  const { selectNotif } = useNotifStore();

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

  const openModal = useModalStore((state) => state.open);

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

  // Запрос на добавление канала, если userId в сторе присутствует
  useEffect(() => {
    if (isAuth && userId) {
      addTelegram(userId);
    }
  }, [isAuth, userId]);

  return (
    <>
      <Header />
      <Main>
        <Flex $gap={20}>
          <Flex $gap={10}>
            <PlainTitle>Настройка уведомлений</PlainTitle>

            <Flex $direction={"row"}>
              <Container>
                <label>
                  <input
                    type="radio"
                    value="vk"
                    checked={selectedPlatform === "vk"}
                    onChange={handlePlatformChange}
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

        <NotifList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};
