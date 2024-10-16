import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface CustomButtonProps {
  color?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button
      className={classNames(styles.customButton, color && styles[color])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
