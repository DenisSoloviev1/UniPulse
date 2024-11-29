import React from "react";
import { NotifList } from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { useNotifStore } from "../../entities/notification";
import { Flex, ModalWindow, PlainTitle, Slider } from "../../shared/ui";
import ManageNotif from "../ManageNotif";
import CardNotif from "../CardNotif";
import { isMobile } from "../../shared/config";

const Push: React.FC = () => {
  const { selectNotif } = useNotifStore();

  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));
  const isOpenMoreNotif = useModalStore((state) =>
    state.isOpen(`Notif-${selectNotif?.id}`)
  );
  const isAddNotifPath = location.pathname.includes("addNotif");

  return (
    <>
      <ModalWindow
        onClick={() => closeModal(`Notif-${selectNotif?.id}`)}
        show={isOpenMoreNotif}
        width={isMobile ? "90%" : "50%"}
        height={isMobile ? "70%" : "90%"}
      >
        <Flex $gap={10} $width={"100%"}>
          <PlainTitle style={{ fontSize: "30px", fontWeight: "500" }}>
            {isAddNotifPath && "Редактирование"}
          </PlainTitle>
          <Slider $padding={5}>
            {isAddNotifPath ? <ManageNotif notifData={selectNotif}/> : <CardNotif />}
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
