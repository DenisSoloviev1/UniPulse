import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { Flex } from "../../components";
import { NotFoundSvg } from "../../assets/svg";
import { Routes } from "../../shared/types";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <NotFoundSvg />
      <Flex>
        <h1>Ошибка 404: страница не найдена.</h1>
        <p>Запрашиваемая страница была удалена или никогда не существовала.</p>
        <p>
          Вернуться на <NavLink to={Routes.AUTH}>главную</NavLink>.
        </p>
      </Flex>
    </div>
  );
};
