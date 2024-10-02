import React, { ReactNode } from "react";
import styles from "./style.module.scss";

interface MainProps {
  title?: string;
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ title, children }) => {
  return (
    <main>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </main>
  );
};

export default Main;
