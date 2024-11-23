import React from "react";
import { NotifList } from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { ModalWindow } from "../../shared/ui";
import { Slider } from "../../shared/ui";

const Push: React.FC = () => {
  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));

  return (
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
  );
};

export default Push;
