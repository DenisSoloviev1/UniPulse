import React from "react";
import { PulseList } from "../../entities/notification";
import { usePushStore } from "../../shared/ui/ModalWindow/store";
import { PushContainer } from "./style.ts";
import { Slider } from "../Main/style";
import { Flex } from "../../shared/ui";
import { Back } from "../../shared/ui/Icon";

const Push: React.FC = () => {
  const closePush = usePushStore((state) => state.close);
  const isOpen = usePushStore((state) => state.isOpen);

  return (
    <PushContainer $show={isOpen}>
      <Flex $justify={"row"}>
        <button onClick={closePush}>
          <Back />
        </button>

        <h4>Уведомления</h4>
      </Flex>
      <Slider>
        <PulseList title={"Неподтвержденные пульсы"} />
      </Slider>
    </PushContainer>
  );
};

export default Push;
