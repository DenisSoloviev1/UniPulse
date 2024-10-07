import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

interface FlexProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

const Flex: React.FC<FlexProps> = ({ title, children, className }) => {
  return (
    <div className={style.flex}>
      {title && <h3 className={style.title}>{title}</h3>}

      <div className={classNames(style.flex, className && style[className])}>
        {children}
      </div>
    </div>
  );
};

export default Flex;
