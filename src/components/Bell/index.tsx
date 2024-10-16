import React from "react";
import styles from "./styles.module.scss";
import { BellOff } from "../../assets/svg";

interface BellProps {
  onClick: () => void;
  count: number;
}

export const Bell: React.FC<BellProps> = ({ onClick, count }) => {
  return (
    <button onClick={onClick} className={styles.bell}>
      {count && count > 0 ? (
        <>
          <BellOff /> <div className={styles.circle}>{count}</div>
        </>
      ) : (
        <BellOff />
      )}
    </button>
  );
};
