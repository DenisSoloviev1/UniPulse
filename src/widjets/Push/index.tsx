import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import PulseList from "../pulseList";
import { usePushStore } from "../../components/ModalWindow/store";
import { Back } from "../../assets/svg";

const Push: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <div className={classNames(styles.push, isOpen ? styles.show : "")}>
      <div className={styles.title}>
        <button onClick={closePush}>
          <Back />
        </button>

        <h4>Уведомления</h4>
      </div>

      <PulseList title={"Неподтвержденные пульсы"} />
    </div>
  );
};

export default Push;
