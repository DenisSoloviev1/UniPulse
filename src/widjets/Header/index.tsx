import React from "react";
import styles from "./style.module.scss";
import NavBar from "../NavBar";

const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <h2>UniPulse</h2>
        <NavBar/>
      </div>
    </header>
  );
};
export default Header;
