import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main>
      <div className={styles.wrapper}>
        <div className={styles.slider}>{children}</div>
      </div>
    </main>
  );
};

export default Main;
