import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { CreatNotif } from "../../widjets/Notif";
import { NotifList } from "../../entities/notification";
import { useAuthStore } from "../../entities/auth";

export const AddNotif: React.FC = () => {
  const { role } = useAuthStore();

  return (
    <>
      <Header />
      <Main>
        <CreatNotif />

        <NotifList title={"Отправленные пульсы"} role={role}/>
      </Main>
    </>
  );
};
