import React, { ReactNode } from "react";
import { Modal, ModalContent } from "./style.ts";

interface ModalWindowProps {
  children: ReactNode;
  onClick: () => void;
  show?: boolean;
  width?: string;
  height?: string;
  position?: string[];
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  onClick,
  show,
  width,
  height,
  position = [],
}) => {
  return show ? (
    <Modal onClick={() => onClick} $background={position.length === 0}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        $width={width}
        $height={height}
        $position={position}
      >
        {children}
      </ModalContent>
    </Modal>
  ) : null;
};
