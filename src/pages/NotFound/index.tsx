import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper, Message } from "../style";
import { NotFoundSvg } from "../../shared/ui/Icon";
import { Routes } from "../../shared/types";

export const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <NotFoundSvg />

      <Message>
        <h2>404: страница не найдена.</h2>

        <p>
          Вернуться на <NavLink to={Routes.AUTH}>главную</NavLink>.
        </p>
      </Message>
    </Wrapper>
  );
};
