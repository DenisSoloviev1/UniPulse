import React, { useEffect } from "react";
import axios from "axios";
import styles from "../styles.module.scss";
import { Flex, CustomButton } from "../../../components";
import { WalcomingSvg, LogoDSTU } from "../../../assets/svg";

export const Auth: React.FC = () => {
  const handleAuth = () => {
    const clientId = "724363";
    const redirectUri = encodeURIComponent("https://example.com/callback");
    const state = "Ert2q5Z";
    const authUrl = `https://edu.donstu.ru/WebApp/#/Authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    window.open(authUrl, "_blank", "width=500,height=600");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      // Отправляем код на сервер для обмена на access_token
      axios
        .post("/api/auth/oauth/token", { code, state })
        .then((response) => {
          const { access_token } = response.data;
          // Сохраняем токен, например, в localStorage
          localStorage.setItem("authToken", access_token);
          // Перенаправляем пользователя в защищенную часть приложения
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    }
  }, [location]);

  return (
    <>
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

              <CustomButton color={"blue"} onClick={handleAuth}>
                <LogoDSTU /> Войти через ЭИОС ДГТУ
              </CustomButton>
            </div>
          </Flex>
        </section>
      </div>
    </>
  );
};
