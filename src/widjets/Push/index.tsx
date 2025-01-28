import { NotifList, useNotifStore } from "../../entities/notification";
import { PlainTitle, Slider, Skeleton } from "../../shared/ui";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../../shared/ui/Icon";
import { RolesDict } from "../../shared/types";
import { useFetchNotifs } from "../../shared/hooks/useFetchNotifs.ts";
import { Modal } from "../../shared/ui/ModalWindow/indexNew.tsx";
import { ModalContent } from "../../shared/ui/ModalWindow/style.ts";

const Push = () => {
  const { pushNotifs } = useNotifStore();

  const { isLoading } = useFetchNotifs("media");

  return (
    <Modal
      renderProp={() => (
        <ModalContent>
          <PlainTitle>Неподтвержденные пульсы</PlainTitle>

          <Slider $padding={5}>
            {isLoading ? ( // мне кажется скелетон можно написать по другому
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} $height="150px" />
              ))
            ) : (
              <NotifList role={RolesDict.MEDIA} initialNotifs={pushNotifs} />
            )}
          </Slider>
        </ModalContent>
      )}
    >
      <BellButton>
        {pushNotifs.length === 0 ? (
          <BellSvg />
        ) : (
          <>
            <BellSvg /> <Circle />
          </>
        )}
      </BellButton>
    </Modal>
  );
};

export default Push;
