import React, { useState, useEffect } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import AddTag from "../../widjets/AddTag";
import { Container, Flex, CustomButton, PlainTitle } from "../../shared/ui";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { NotifList } from "../../entities/notification";
import { TagList } from "../../entities/tag";
import { useTagStore, getSubscriptions } from "../../entities/tag";
import { Plus } from "../../shared/ui/Icon";

export const MyNotif: React.FC = () => {
  const { setSubscriptionTags } = useTagStore();
  const token = localStorage.getItem("authToken") || "";

  const [selectedPlatform, setSelectedPlatform] = useState<string>("профиля");
  const [userId, setUserId] = useState<string>("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const openAddTag = useModalStore((state) => state.open);

  useEffect(() => {
    if (!token) return;

    const fetchSubscriptions = async () => {
      try {
        const responseData = await getSubscriptions();
        setSubscriptionTags(responseData);
        console.log("Загруженные подписки:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки подписок:", error);
      }
    };

    fetchSubscriptions();
  }, [token, setSubscriptionTags]);
  const { subscriptionTags } = useTagStore();

  return (
    <>
      <Header />
      <Main>
        <Flex $gap={20}>
          <Flex $gap={10}>
            <PlainTitle>Место отправки уведомлений</PlainTitle>

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
                value={userId}
                onChange={handleUserIdChange}
              />
            </Container>
          </Flex>

          <Flex $gap={10}>
            <PlainTitle>Мои подписки</PlainTitle>

            <Flex $direction={"row"} $align={"center"} $gap={10}>
              <TagList initialTags={subscriptionTags} />
              <CustomButton
                type={"button"}
                $style={"blue"}
                onClick={() => openAddTag("AddTag")}
              >
                <Plus />
              </CustomButton>
              <AddTag />
            </Flex>
          </Flex>
        </Flex>

        <NotifList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};
