import React from "react";
import { handleAuth } from "../../entities/auth/api";
import styles from "../styles.module.scss";
import { Flex, CustomButton } from "../../shared/ui";
import { WalcomingSvg, LogoDSTU } from "../../assets/svg";
import { Callback } from "../../entities/auth/api/callback";
import { useAuthStore } from "../../entities/auth";

export const Auth: React.FC = () => {
  const {isAuth} = useAuthStore();
  console.log(isAuth)

  return (
    <div className={styles.wrapper}>
      <section className={styles.walcoming}>
        <Flex className={"row"}>
          <WalcomingSvg />

          <div className={styles.message}>
            <h1>Приветствуем вас в UniPulse!</h1>
            <p>
              В вашем личном вузовском помощнике. Теперь все важные события,
              новости и изменения у вас под рукой.
            </p>
            <p>Будьте на пульсе жизни университета вместе с нами!</p>

            <Callback />
            <CustomButton className={"blue"} onClick={handleAuth}>
              <LogoDSTU /> Войти через ЭИОС ДГТУ
            </CustomButton>
          </div>
        </Flex>
      </section>
    </div>
  );
};
