import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  active?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  active = true,
}) => {
  return (
    <div
      className={classNames(
        styles.container,
        className?.split(" ").map((c) => styles[c]),
        active && styles.active
      )}
    >
      {children}
    </div>
  );
};
