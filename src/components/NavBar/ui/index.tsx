import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../pages";
import styles from "../styles.module.scss";

export const NavBar: React.FC = () => {
  const { role } = useAuthStore();
  
  return (
    <nav className={styles.nav}>
      <NavLink
        to={`/${role}/addPulse`}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Создание
      </NavLink>
      <NavLink
        to={`/${role}/myPulse`}
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Профиль
      </NavLink>

      <NavLink to="/">Выйти</NavLink>
    </nav>
  );
};
