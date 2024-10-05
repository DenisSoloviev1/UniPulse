import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface CustomButtonProps {
  color?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  color,
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button
      className={classNames(style.customButton, color && style[color])}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CustomButton;
