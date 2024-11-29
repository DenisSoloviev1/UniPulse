import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import CreatNotif from "../../widjets/CreatNotif";
import { NotifList } from "../../entities/notification";

export const AddNotif: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <CreatNotif  notifData={''}/>

        <NotifList title={"Отправленные пульсы"} />
      </Main>
    </>
  );
};
