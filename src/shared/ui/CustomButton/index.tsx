import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface CustomButtonProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button
      className={classNames(styles.customButton, className && styles[className])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
