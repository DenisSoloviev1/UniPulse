import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { Logo } from "../../assets/svg";
import { Bell } from "../../components";
import Push from "../../widjets/Push";
import { usePushStore } from "../../components/ModalWindow/store";

interface HeaderProps {
  role: string;
}

const Header: React.FC<HeaderProps> = ({ role }) => {
  const closePush = usePushStore((state) => state.close);
  const openPush = usePushStore((state) => state.open);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <header>
      <div className={styles.wrapper}>
        <Logo />
        <Push />
        <h3>{role}</h3>

        <nav className={styles.nav}>
          <Bell onClick={isOpen ? closePush : openPush} count={5} />
          {/* как-то поменять отображение на телефонах, сейчас его не видно*/}

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
      </div>
    </header>
  );
};
export default Header;
