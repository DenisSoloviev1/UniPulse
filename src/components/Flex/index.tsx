import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface FlexProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const Flex: React.FC<FlexProps> = ({ title, children, className }) => {
  return (
    <div className={styles.flex}>
      {title && <h3 className={styles.title}>{title}</h3>}

      <div className={classNames(styles.flex, className && styles[className])}>
        {children}
      </div>
    </div>
  );
};
