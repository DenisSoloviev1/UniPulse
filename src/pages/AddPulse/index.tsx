import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Form from "../../widjets/Form";
import PulseList from "../../widjets/PulseList";

interface AddPulseProps {
  role: string;
}

export const AddPulse: React.FC<AddPulseProps> = ({ role }) => {
  return (
    <>
      <Header role={role} />
      <Main>
        <Form />

        <PulseList title={"Отправленные пульсы"} />
      </Main>
    </>
  );
};
