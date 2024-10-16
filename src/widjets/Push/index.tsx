import React from "react";
import classNames from "classnames";
import style from "./style.module.scss";
import PulseList from "../pulseList";
import { usePushStore } from "../../components/ModalWindow/store";
import { Back } from "../../assets/svg";

const Push: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <div className={classNames(style.push, isOpen ? style.show : "")}>
      <div className={style.title}>
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
