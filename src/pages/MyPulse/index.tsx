import React, { useState } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { Container, Flex, CustomButton } from "../../shared/ui";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store";
import { PulseList } from "../../entities/pulseList";
import { TagList } from "../../entities/tagList";
import { Cat } from "../../assets/svg";
import { useAuthStore } from "../../entities/auth";

export const MyPulse: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("профиля");
  const [userId, setUserId] = useState<string>("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const closeModal = useAddTagStore((state) => state.close);

  const { isAuth } = useAuthStore();
  // console.log(role);
  console.log(isAuth);

  return (
    <>
      <Header />
      <Main>
        <Flex title={"Место отправки уведомлений"}>
          <Flex className={"row"}>
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

        <TagList title={"Мои теги"}>
          <>
            <Cat />
            <CustomButton onClick={closeModal} className={"blue"}>
              Готово
            </CustomButton>
          </>
        </TagList>

        <PulseList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};
