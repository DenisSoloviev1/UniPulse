import React, { ReactNode, useEffect, useRef } from "react";
import { Modal, ModalContent } from "./style.ts";

interface ModalWindowProps {
  children: ReactNode;
  onClick: () => void; // Функция закрытия модального окна
  show: boolean; // Флаг отображения модального окна
  width?: string; // Ширина модального окна
  height?: string; // Высота модального окна
  position?: string[]; // Позиция модального окна
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  onClick,
  show,
  width,
  height,
  position = [],
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClick();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClick]);

  return show ? (
    position.length === 0 ? (
      <Modal>
        <ModalContent
          ref={modalRef}
          onClick={(e) => e.stopPropagation()} 
          $width={width}
          $height={height}
          $position={position}
        >
          {children}
        </ModalContent>
      </Modal>
    ) : (
      <ModalContent
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} 
        $width={width}
        $height={height}
        $position={position}
      >
        {children}
      </ModalContent>
    )
  ) : null;
};
