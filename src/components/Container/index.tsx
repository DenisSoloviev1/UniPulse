import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  active?: boolean; 
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  active = true, 
}) => {
  return (
    <div
      className={classNames(
        style.container,
        className?.split(" ").map((c) => style[c]),
        active && style.active
      )}
    >
      {children}
    </div>
  );
};

export default Container;
