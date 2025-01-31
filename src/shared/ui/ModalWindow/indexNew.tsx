import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(133, 132, 132, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  cursor: auto;
`;

const handleKeyDown = (e: KeyboardEvent) => {
  if (
    e.key === " " &&
    !(
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    )
  ) {
    e.preventDefault();
  }
};

export const Modal = ({
  children,
  renderProp,
  width = "unset",
}: {
  children: ReactNode;
  renderProp: (setIsOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  width?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen &&
        createPortal(
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              document.body.style.overflow = "unset";
            }}
          >
            {renderProp(setIsOpen)}
          </Button>,
          document.body
        )}
      <button
        style={{ width }}
        onClick={() => {
          setIsOpen(true);
          document.body.style.overflow = "hidden";
        }}
      >
        {children}
      </button>
    </>
  );
};
