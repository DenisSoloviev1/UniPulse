import React, { useState } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Flex from "../../components/Flex";
import Container from "../../components/Container";
import PulseList from "../../widjets/pulseList";
import TagList from "../../widjets/tagList";

interface MyPulseProps {
  role: string;
}

const MyPulse: React.FC<MyPulseProps> = ({ role }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("профиля");
  const [userId, setUserId] = useState<string>("");

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPlatform(event.target.value);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  return (
    <>
      <Header role={role} />
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

        <TagList title={"Мои теги"} />

        <PulseList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};

export default MyPulse;
