import React from "react";
import { handleAuth } from "../../entities/auth/api";
import { CustomButton } from "../../shared/ui";
import { Wrapper, Message } from "../style";
import { WalcomingSvg, LogoDSTU } from "../../shared/ui/Icon";
import { Callback } from "../../entities/auth/api/callback";

export const Auth: React.FC = () => {
  return (
    <Wrapper>
      <WalcomingSvg />

      <Message>
        <h1>Приветствуем в UniPulse!</h1>
        <p>
          В вашем личном вузовском помощнике. Теперь все важные события,
          <br /> новости и изменения у вас под рукой.
        </p>
        <p>Будьте на пульсе жизни университета вместе с нами!</p>

        <Callback />
        <CustomButton $style={"blue"} onClick={handleAuth}>
          <LogoDSTU /> Войти через edu.donst.ru
        </CustomButton>
      </Message>
    </Wrapper>
  );
};
