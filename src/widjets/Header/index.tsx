import React from "react";
import styles from "./styles.module.scss";
import { Logo } from "../../assets/svg";
import { Bell, NavBar } from "../../components";
import Push from "../../widjets/Push";
import { usePushStore } from "../../components/ModalWindow/store";

const Header: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const openPush = usePushStore((state) => state.open);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <header>
      <div className={styles.wrapper}>
        <Logo />

        <Push />

        <Bell onClick={isOpen ? closePush : openPush} count={5} />

        <NavBar />
      </div>
    </header>
  );
};
export default Header;
