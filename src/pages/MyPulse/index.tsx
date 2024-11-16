import React, { useState } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import AddTag from "../../widjets/AddTag";
import { Container, Flex, CustomButton, PlainTitle } from "../../shared/ui";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store";
import { PulseList } from "../../entities/notification";
import { TagList } from "../../entities/tag";
import { useTagStore, useFetchSubscriptions } from "../../entities/tag"; 

export const MyPulse: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("профиля");
  const [userId, setUserId] = useState<string>("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const openModal = useAddTagStore((state) => state.open);
  useFetchSubscriptions();
  const { subscriptionTags } = useTagStore();
  console.log(`мои подписки: ${subscriptionTags}`)

  return (
    <>
      <Header />
      <Main>
        <Flex>
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
            <Flex className={"row"}>
              <input
                type="text"
                placeholder={`Введите ID ${selectedPlatform}`}
                value={userId}
                onChange={handleUserIdChange}
              />
            </Flex>
          </Container>
        </Flex>

        <Flex>
          <PlainTitle>Мои подписки</PlainTitle>

          <Flex >
            <TagList initialTags={subscriptionTags}/>
            <CustomButton type={"button"} $style={"blue"} onClick={openModal}>
              +
            </CustomButton>
            <AddTag />
          </Flex>
        </Flex>
        <PulseList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};
