import React from "react";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../Icon";

interface BellProps {
  onClick: () => void;
  count: number;
}

export const Bell: React.FC<BellProps> = ({ onClick, count }) => {
  return (
    <BellButton onClick={onClick}>
      {count && count > 0 ? (
        <>
          <BellSvg /> <Circle>{count}</Circle>
        </>
      ) : (
        <BellSvg />
      )}
    </BellButton>
  );
};
