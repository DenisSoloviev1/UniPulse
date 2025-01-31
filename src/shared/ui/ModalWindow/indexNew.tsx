import { ReactNode, useEffect, useRef } from "react";
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

export const Modal = ({
  children,
  renderProp,
  width = "unset",
}: {
  children: ReactNode;
  renderProp: () => ReactNode;
  width?: string;
}) => {
  const isOpenRef = useRef(false);

  useEffect(() => {
    if (isOpenRef.current) {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpenRef.current]);

  const openModal = () => {
    isOpenRef.current = true;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    isOpenRef.current = false;
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {isOpenRef.current &&
        createPortal(
          <Button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            {renderProp()}
          </Button>,
          document.body
        )}
      <button
        style={{ width }}
        onClick={() => {
          openModal();
        }}
      >
        {children}
      </button>
    </>
  );
};
