import React, { ReactNode } from "react";
import styles from "./style.module.scss";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main>
      <div className={styles.wrapper}>
        <h1>Отправка уведомления</h1>
        {children}
      </div>
    </main>
  );
};

export default Main;
