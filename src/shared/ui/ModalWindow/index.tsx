import React, { ReactNode } from "react";
import { Modal, ModalContent } from "./style.ts";
import { useAddTagStore } from "../ModalWindow/store";

interface ModalWindowProps {
  children: ReactNode;
  open?: boolean;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ children, open }) => {
  const closeModal = useAddTagStore((state) => state.close);
  const isOpen = useAddTagStore((state) => state.isOpen);

  return isOpen || open ? (
    <Modal onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Modal>
  ) : null;
};
