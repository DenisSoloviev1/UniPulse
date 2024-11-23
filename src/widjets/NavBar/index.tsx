import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { Bell } from "../../shared/ui";
import { NavItems, INav } from "./constants";
import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
`;

export const NavBar: React.FC = () => {
  const { role, resetAuth } = useAuthStore((state) => state);

  return (
    <Nav>
      <Bell />

      {NavItems.filter(
        (link: INav) =>
          Array.isArray(link.allowedRoles) && link.allowedRoles.includes(role)
      ).map((link: INav) => (
        <NavLink
          key={link.id}
          to={link.path}
          style={({ isActive }) =>
            isActive ? { textDecoration: "underline" } : {}
          }
          onClick={link.label === "Выйти" ? resetAuth : undefined}
        >
          {link.label}
        </NavLink>
      ))}
    </Nav>
  );
};
