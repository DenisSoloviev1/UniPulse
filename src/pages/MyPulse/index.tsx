import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Flex from "../../components/Flex";
import Container from "../../components/Container";
import PulseList from "../../widjets/PulseList";
import TagList from "../../widjets/TagList";

const MyPulse: React.FC = () => {
  return (
    <>
      <Header />
      <Main title={"Мои пульсы"}>
        <Flex title={"Место получения уведомлений"}>
          <Flex className={"row"}>
            <Container>Вконтакте</Container>
            <Container>Телеграм</Container>
          </Flex>
          <Container>
            <Flex className={"row"}>vk.com/id228322 </Flex>
          </Container>
        </Flex>

        <TagList title={"Мои теги"} />

        <PulseList title={"Полученные пульсы"} />
      </Main>
    </>
  );
};

export default MyPulse;
