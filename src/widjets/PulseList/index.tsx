import React from "react";
import style from "./style.module.scss";
import Flex from "../../components/Flex";
import PulseItem from "../../widjets/PulseItem";
import Tag from "../../components/Tag";

const PulseList: React.FC = () => {
  return (
    <article className={style.pulseList}>
      <Flex title={"Отправленные пульсы"}>
        
      </Flex>
    </article>
  );
};

export default PulseList;
