import React from "react";
import { NotifList } from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { PushContainer, Head } from "./style.ts";
import { Slider } from "../../shared/ui";
import { Back } from "../../shared/ui/Icon";

const Push: React.FC = () => {
  const closePush = useModalStore((state) => state.close);
  const isOpenAddTag = useModalStore((state) => state.isOpen("Push"));

  return (
    <PushContainer $show={isOpenAddTag}>
      <Head>
        <button onClick={()=>closePush("Push")}>
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
