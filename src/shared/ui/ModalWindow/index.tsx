import React, { ReactNode } from "react";
import { Modal, ModalContent } from "./style.ts";
// import { useModalStore } from "../ModalWindow/store";

interface ModalWindowProps {
  children: ReactNode;
  onClick: () => void;
  show?: boolean;
  background?: boolean;
  width?: string;
  height?: string;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  onClick,
  show,
  background = true,
  width,
  height,
}) => {
  // const closeModal = useModalStore((state) => state.close);

  return show ? (
    <Modal onClick={onClick} $background={background}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $width={width}
        $height={height}
      >
        {children}
      </ModalContent>
    </Modal>
  ) : null;
};
