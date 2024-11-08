import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../entities/auth";
import styles from "./styles.module.scss";
import { NavItems, INav } from "./constants";

export const Nav: React.FC = () => {
  const { role, resetAuth } = useAuthStore((state) => state);

  return (
    <nav className={styles.nav}>
      {NavItems.filter(
        (link: INav) =>
          Array.isArray(link.allowedRoles) && link.allowedRoles.includes(role)
      ).map((link: INav) => (
        <NavLink
          key={link.id}
          to={link.path}
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={link.label === "Выйти" ? resetAuth : undefined}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
