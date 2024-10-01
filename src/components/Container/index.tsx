import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface ContainerProps {
  children?: ReactNode;
  className?: string;
  clickId?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  clickId,
}) => {
  const handleClick = () => {
    if (clickId) {
      const element = document.getElementById(clickId);
      if (element) {
        element.focus();
        element.click();
      }
    }
  };

  return (
    <div
    className={classNames(style.container, className?.split(" ").map(c => style[c]))} 
    onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Container;
