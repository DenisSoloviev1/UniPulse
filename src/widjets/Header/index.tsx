import React from "react";
import styles from "./style.module.scss";

const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <h2>UniPulse</h2>
      </div>
    </header>
  );
};
export default Header;
