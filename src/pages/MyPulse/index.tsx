import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Flex from "../../components/Flex";
import Container from "../../components/Container";
import PulseItem from "../../widjets/PulseItem";
import Tag from "../../components/Tag";

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
          <Container><Flex className={"row"}>vk.com/id228322 </Flex></Container>
        </Flex>

        <Flex title={"Мои теги"}>
        <Flex className={"row"}>
          <Tag id={"1"} text={"Все преподаватели"} />
          <Tag id={"2"} text={"Студенты"} />
        </Flex>
      </Flex>

        <Flex title={"Полученные пульсы"}>
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"1"}
          />
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"2"}
          />
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"3"}
          />
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"4"}
          />
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"5"}
          />
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"6"}
          />
        </Flex>
      </Main>
    </>
  );
};

export default MyPulse;
