import { useEffect, useState } from "react";
import {
  NotifList,
  getNotifs,
  useNotifStore,
} from "../../entities/notification";
import { useModalStore } from "../../shared/ui/ModalWindow/store";
import { ModalWindow, PlainTitle, Slider, Skeleton } from "../../shared/ui";
import { BellButton, Circle } from "./style.ts";
import { BellSvg } from "../../shared/ui/Icon";
import { RolesDict } from "../../shared/types";

const Push = () => {
  // не надо тут писать React.FC, пиши его если хочешь использовать его дженерик

  const { pushNotifs, setPushNotifs } = useNotifStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isOpenPush = useModalStore((state) => state.isOpen("Push"));

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const responseData = await getNotifs(RolesDict.MEDIA);
        setPushNotifs(responseData);
        setIsLoading(false);
        console.log("Загруженные уведомления:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки уведомлений:", error);
      }
    };
    fetchNotifs();
  }, [setPushNotifs]);

  return (
    <>
      <BellButton onClick={() => openModal("Push")}>
        {pushNotifs.length === 0 ? (
          <BellSvg />
        ) : (
          <>
            <BellSvg /> <Circle />
          </>
        )}
      </BellButton>

      <ModalWindow
        onClick={() => closeModal("Push")}
        show={isOpenPush}
        position={["60px", "", "", "10px"]}
        width={"80%"}
      >
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
      </ModalWindow>
    </>
  );
};

export default Push;
