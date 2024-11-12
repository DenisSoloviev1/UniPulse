import React, { ReactNode } from "react";
import { Modal, ModalContent } from "./style.ts";
import { useAddTagStore } from "../ModalWindow/store";
import { Close } from "../Icon";
import { CustomButton } from "../CustomButton";

interface ModalWindowProps {
  children: ReactNode;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
  const closeModal = useAddTagStore((state) => state.close);
  const isOpen = useAddTagStore((state) => state.isOpen);

  return (
    <Modal $show={isOpen} onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CustomButton onClick={closeModal} type={"button"} $close={"big"}>
          <Close />
        </CustomButton>
        {children}
      </ModalContent>
    </Modal>
  );
};
