import React from "react";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../Icon";
import { useModalStore } from "../ModalWindow/store.ts";

interface BellProps {
  push?: boolean;
}

export const Bell: React.FC<BellProps> = ({ push = true }) => {
  const openModal = useModalStore((state) => state.open);

  return (
    <BellButton onClick={() => openModal("Push")}>
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
