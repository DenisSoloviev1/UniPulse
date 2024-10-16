import React, { ReactNode } from "react";
import classNames from "classnames";
import style from "./style.module.scss";
import {useAddTagStore} from "../ModalWindow/store";
import { Close } from "../../assets/svg";

interface ModalWindowProps {
  children: ReactNode;
}
const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
    const closeModal = useAddTagStore((state) => state.close);
    const isOpen = useAddTagStore((state) => state.isOpen);

  return (
    <div
      className={classNames(style.modalWindow, isOpen ? style.show : "")}
      onClick={closeModal}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
        <button className={style.close} onClick={closeModal}>
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
