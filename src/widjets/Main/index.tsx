import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main>
      <div className={styles.wrapper}>{children}</div>
    </main>
  );
};

export default Main;
