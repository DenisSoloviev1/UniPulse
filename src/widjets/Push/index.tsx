import React, {useState} from "react";
import { NotifList } from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { ModalWindow } from "../../shared/ui";
import { Slider } from "../../shared/ui";
import CreatNotif from "../CreatNotif";

const Push: React.FC = () => {
  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));
  const isOpenEdit = useModalStore((state) => state.isOpen("Edit"));
    const [notif, setNotif] = useState('');
    const openModal = useModalStore((state) => state.open);



    function handleModalTrigger(notifItem) {
        closeModal("Push")
    console.log('index', notifItem)
      setNotif(notifItem)
        openModal("Edit")

  }

  return (
      <>
        <ModalWindow
            onClick={() => closeModal("Edit")}
            show={isOpenEdit}
            position={["60px", "", "", "10px"]}
            width={"80%"}
            height={"auto"}
        >
            <CreatNotif notifData={notif} />

        </ModalWindow>

        <ModalWindow
            onClick={() => closeModal("Push")}
            show={isOpenPush}
            position={["60px", "", "", "10px"]}
            width={"80%"}
        >
          <Slider $padding={5}>
            <NotifList title={"Неподтвержденные пульсы"} active={true} onModalTrigger={handleModalTrigger} />
          </Slider>
        </ModalWindow>
      </>
  );
};

export default Push;
