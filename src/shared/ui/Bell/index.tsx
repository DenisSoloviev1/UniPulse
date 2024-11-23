import React from "react";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../Icon";
import { useModalStore } from "../ModalWindow/store.ts";

interface BellProps {
  push?:boolean;
}

export const Bell: React.FC<BellProps> = ({ push = true }) => {
  const closeModal = useModalStore((state) => state.close);
  const openModal = useModalStore((state) => state.open);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));

  return (
    <BellButton
      onClick={isOpenPush ? () => closeModal("Push") : () => openModal("Push")}
    >
      {push ? (
        <>
          <BellSvg /> <Circle />
        </>
      ) : (
        <BellSvg />
      )}
    </BellButton>
  );
};
