import React from "react";
import style from "./style.module.scss";

const NavBar: React.FC = () => {
  return (
    <nav className={style.nav}>
      <a href="">Создание</a>
      <a href="">Редактирование</a>
      <a href="">Вход</a>
    </nav>
  );
};

export default NavBar;