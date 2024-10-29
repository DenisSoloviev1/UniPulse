import React from "react";
import styles from "./styles.module.scss";

interface LoaderProps {
  message?: string;
}
export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pulse}></div>
      <h2>{message}</h2>
    </div>
  );
};
