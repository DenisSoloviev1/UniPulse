import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Form from "../../widjets/Form";
import PulseList from "../../widjets/PulseList";

const AddPulse: React.FC = () => {

  return (
    <>
      <Header />
      <Main title={"Новый пульс"}>
        <Form />

        <PulseList title={"Отправленные пульсы"}/>
      </Main>
    </>
  );
};

export default AddPulse;
