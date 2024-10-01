import React from "react";
import style from "./style.module.scss";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import Form from "../../widjets/Form";

const AddPulse: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Form/>
      </Main>
    </>
  );
};

export default AddPulse;
