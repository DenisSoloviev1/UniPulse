import React from "react";
import style from "./style.module.scss";
import { BellOff } from "../../assets/svg";

interface BellProps {
  onClick: () => void;
  count: number;
}

const Bell: React.FC<BellProps> = ({ onClick, count }) => {
  return (
    <button onClick={onClick} className={style.bell}>
      {count && count > 0 ? (
        <>
          <BellOff /> <div className={style.circle}>{count}</div>
        </>
      ) : (
        <BellOff />
      )}
    </button>
  );
};

export default Bell;
