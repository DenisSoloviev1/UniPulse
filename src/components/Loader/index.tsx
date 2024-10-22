import React from "react";
import styles from "./styles.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pulse}></div>

      <h2>Авторизация</h2>
    </div>
  );
};
