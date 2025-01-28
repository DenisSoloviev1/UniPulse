import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { NavItems } from "./constants";
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
      bottom: 3px;
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

export const NavBar = () => {
  const { role, resetAuth } = useAuthStore((state) => state);

  return (
    <Nav>
      {NavItems.reduce((acc, link) => {
        const { id, path, label, svg, allowedRoles } = link;
        if (!allowedRoles.includes(role)) {
          return acc;
        }

        return [
          ...acc,
          <NavLink
            key={id}
            data-id={String(id)}
            to={path}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={label === "Выйти" ? resetAuth : () => {}}
          >
            <span>{label}</span>
            {svg}
          </NavLink>,
        ];
      }, [] as ReactNode[])}
    </Nav>
  );
};
