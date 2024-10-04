import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Container: React.FC<ContainerProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={classNames(
        style.container,
        className?.split(" ").map((c) => style[c])
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Container;
