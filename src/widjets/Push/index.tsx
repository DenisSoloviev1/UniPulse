import React from "react";
import { NotifList } from "../../entities/notification";
import { useAuthStore } from "../../entities/auth";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { useNotifStore } from "../../entities/notification";
import { Flex, ModalWindow, PlainTitle, Slider } from "../../shared/ui";
import { isMobile } from "../../shared/config";
import { EditNotif } from "../Notif";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../../shared/ui/Icon/index.tsx";

const Push: React.FC = () => {
  const { role } = useAuthStore();

  const { selectNotif } = useNotifStore();

  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));


  const push: boolean = true;
  return (
    <>
      <BellButton onClick={() => openModal("Push")}>
        {push ? (
          <>
            <BellSvg /> <Circle />
          </>
        ) : (
          <BellSvg />
        )}
      </BellButton>

      <ModalWindow
        onClick={() => closeModal("Push")}
        show={isOpenPush}
        position={["60px", "", "", "10px"]}
        width={"80%"}
      >
        <Slider $padding={5}>
          <NotifList title={"Неподтвержденные пульсы"} role={role} />
        </Slider>
      </ModalWindow>
    </>
  );
};

export default Push;
