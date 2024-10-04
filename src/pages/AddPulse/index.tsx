import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Form from "../../widjets/Form";
import Flex from "../../components/Flex";
import PulseItem from "../../widjets/PulseItem";

const AddPulse: React.FC = () => {

  return (
    <>
      <Header />
      <Main title={"Создание пульса"}>
        <Form />

        <Flex title={"Отправленные пульсы"}>
          <PulseItem
            title={"Окончание зачетной недели"}
            text={
              "Дорогие студенты! Через две недели наступает окончание зачетной недели, в связи с чем просим вас досдать все ваши долги"
            }
            id={"1"}
          />
        </Flex>
      </Main>
    </>
  );
};

export default AddPulse;
