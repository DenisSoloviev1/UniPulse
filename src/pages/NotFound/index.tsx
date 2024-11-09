import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "../style";
import { Flex } from "../../shared/ui";
import { NotFoundSvg } from "../../shared/ui/Icon";
import { Routes } from "../../shared/types";

export const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <NotFoundSvg />
      <Flex>
        <h2>Ошибка 404: страница не найдена.</h2>
        <p>Запрашиваемая страница была удалена или никогда не существовала.</p>
        <p>
          Вернуться на <NavLink to={Routes.AUTH}>главную</NavLink>.
        </p>
      </Flex>
    </Wrapper>
  );
};
