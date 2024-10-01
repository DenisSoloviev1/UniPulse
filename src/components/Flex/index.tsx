import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface FlexProps {
  children?: ReactNode;
  className?: string;
}

const Flex: React.FC<FlexProps> = ({ children, className }) => {
  return (
    <div className={classNames(style.flex, className && style[className])}>
      {children}
    </div>
  );
};

export default Flex;
