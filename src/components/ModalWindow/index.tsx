import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { useAddTagStore } from "../ModalWindow/store";
import { Close } from "../../assets/svg";
import { CustomButton } from "../CustomButton";

interface ModalWindowProps {
  children: ReactNode;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ children }) => {
  const closeModal = useAddTagStore((state) => state.close);
  const isOpen = useAddTagStore((state) => state.isOpen);

  return (
    <div
      className={classNames(styles.modalWindow, isOpen ? styles.show : "")}
      onClick={closeModal}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <CustomButton onClick={closeModal} type={"button"} className={"closeBig"}>
          <Close />
        </CustomButton>
        {children}
      </div>
    </div>
  );
};
