import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Form from "../../widjets/Form";
import { PulseList } from "../../entities/pulseList";

export const AddPulse: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Form />

        <PulseList title={"Отправленные пульсы"} />
      </Main>
    </>
  );
};
