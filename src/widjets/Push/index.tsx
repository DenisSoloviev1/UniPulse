import React from "react";
import { NotifList } from "../../entities/notification";
import { usePushStore } from "../../shared/ui/ModalWindow/store";
import { PushContainer, Head } from "./style.ts";
import { Slider } from "../../shared/ui";
import { Back } from "../../shared/ui/Icon";

const Push: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <PushContainer $show={isOpen}>
      <Head>
        <button onClick={closePush}>
          <Back />
        </button>

        <h4>Уведомления</h4>
      </Head>

      <Slider $padding={15}>
        <NotifList title={"Неподтвержденные пульсы"} />
      </Slider>
    </PushContainer>
  );
};

export default Push;
