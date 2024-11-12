import React from "react";
import { handleAuth } from "../../entities/auth/api";
import { Flex, CustomButton } from "../../shared/ui";
import { Wrapper, Message } from "../style";
import { WalcomingSvg, LogoDSTU } from "../../shared/ui/Icon";
import { Callback } from "../../entities/auth/api/callback";

export const Auth: React.FC = () => {
  return (
    <Wrapper>
      <Flex $direction={"row"} $align={"center"}>
        <WalcomingSvg />

        <Message>
          <h1>Приветствуем вас в UniPulse!</h1>
          <p>
            В вашем личном вузовском помощнике. Теперь все важные события,
            новости и изменения у вас под рукой.
          </p>
          <p>Будьте на пульсе жизни университета вместе с нами!</p>

          <Callback />
          <CustomButton $style={"blue"} onClick={handleAuth}>
            <LogoDSTU /> Войти через lk.donst.ru
          </CustomButton>
        </Message>
      </Flex>
    </Wrapper>
  );
};
