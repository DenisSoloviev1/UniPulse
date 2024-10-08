import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.scss";
import Flex from "../../components/Flex";
import { NotFoundSvg } from "../../assets/svg";

const NotFound: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <NotFoundSvg />
      <Flex>
        <h1>Ошибка 404: страница не найдена.</h1>
        <p>Запрашиваемая страница была удалена или никогда не существовала.</p>
        <p>
          Вернуться на <NavLink to="/">главную</NavLink>.
        </p>
      </Flex>
    </div>
  );
};

export default NotFound;
