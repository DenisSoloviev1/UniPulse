import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../pages";
import styles from "../styles.module.scss";
import { NavItems, INav } from "../constants";

export const Nav: React.FC = () => {
  const { role } = useAuthStore();

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
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
