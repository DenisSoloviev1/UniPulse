import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { NavItems, INav } from "./constants";
import styled from "styled-components";
import "../../shared/Variables.scss";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;

  svg {
    fill: var(--color-action);
    display: none;
    height: 25px;
  }

  .active {
    text-decoration: underline;
    transition: all 0.3s easi-in-out;

    svg {
      position: relative;
      bottom: 5px;
      transform: scale(1.2);
      filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.4));
    }
  }

  @media screen and (max-width: 601px) {
    width: 100%;
    justify-content: space-evenly;
    span {
      display: none;
    }
    svg {
      display: flex;
    }
  }
`;

export const NavBar: React.FC = () => {
  const { role, resetAuth } = useAuthStore((state) => state);

  return (
    <Nav>
      {NavItems.filter(
        (link: INav) =>
          Array.isArray(link.allowedRoles) && link.allowedRoles.includes(role)
      ).map((link: INav) => (
        <NavLink
          key={link.id}
          to={link.path}
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={link.label === "Выйти" ? resetAuth : undefined}
        >
          <span>{link.label}</span>
          {link.svg}
        </NavLink>
      ))}
    </Nav>
  );
};
