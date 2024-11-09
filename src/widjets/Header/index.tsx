import React from "react";
import styles from "./styles.module.scss";
import { Logo } from "../../shared/ui/Icon";
import { Bell } from "../../shared/ui";
import { NavBar } from "../NavBar";
import Push from "../../widjets/Push";
import { usePushStore } from "../../shared/ui/ModalWindow/store";

const Header: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const openPush = usePushStore((state) => state.open);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <header>
      <div className={styles.wrapper}>
        <Logo />

        <Push />

        <div className={styles.nav}>
          <Bell onClick={isOpen ? closePush : openPush} count={5} />

          <NavBar />
        </div>
      </div>
    </header>
  );
};
export default Header;
