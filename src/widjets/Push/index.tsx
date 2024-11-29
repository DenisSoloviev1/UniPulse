import React from "react";
import { NotifList, useNotifStore } from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { Flex, ModalWindow, PlainTitle } from "../../shared/ui";
import { Slider } from "../../shared/ui";
import ManageNotif from "../ManageNotif";
import { isMobile } from "../../shared/config";

const Push: React.FC = () => {
  const { selectNotif } = useNotifStore();

  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));
  const isOpenNotif = useModalStore((state) =>
    state.isOpen(`Notif-${selectNotif?.id}`)
  );

  return (
    <>
      <ModalWindow
        onClick={() => closeModal(`Notif-${selectNotif?.id}`)}
        show={isOpenNotif}
        width={isMobile ? "90%" : "60%"}
        height={isMobile ? "80%" : "auto"}
      >
        <Flex $gap={10} $width={"100%"}>
          <PlainTitle style={{ textAlign: "center", fontSize: "30px", fontWeight: "500" }}>Редактирование</PlainTitle>
          <Slider $padding={5}>
            <ManageNotif />
          </Slider>
        </Flex>
      </ModalWindow>

      <ModalWindow
        onClick={() => closeModal("Push")}
        show={isOpenPush}
        position={["60px", "", "", "10px"]}
        width={"80%"}
      >
        <Slider $padding={5}>
          <NotifList title={"Неподтвержденные пульсы"} />
        </Slider>
      </ModalWindow>
    </>
  );
};

export default Push;
