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
        <h1>Приветствуем в UniPulse - <br/>пульсе жизни университета!</h1>
        <p>
          Это единая система информирования пользователя о всех важных и
          персональных фактах,
          <br /> новостях и мероприятиях Донского государственного технического
          университета.
        </p>
        <p>Будь в курсе с UniPulse!</p>

        <Callback />
        <CustomButton $style={"blue"} onClick={handleAuth}>
          <LogoDSTU /> Войти через edu.donst.ru
        </CustomButton>
      </Message>
    </Wrapper>
  );
};
