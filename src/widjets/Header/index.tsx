import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.scss";
import { Logo } from "../../assets/svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className={style.wrapper}>
        <Logo/>

        <nav className={style.nav}>
          <NavLink to="/addPulse">Создание</NavLink>
          <NavLink to="/myPulse">Профиль</NavLink>
          <NavLink to="/">Вход</NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
