import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import { CreatNotif } from "../../widjets/Notif";
import { NotifList, useNotifStore } from "../../entities/notification";
import { Flex, PlainTitle, Skeleton } from "../../shared/ui";
import { RolesDict } from "../../shared/types";
import { useFetchNotifs } from "../../shared/hooks/useFetchNotifs";

export const AddNotif = () => {
  const { notifs } = useNotifStore();
  const { isLoading } = useFetchNotifs();

  return (
    <>
      <Header />
      <Main>
        <CreatNotif />

        <Flex $gap={10} $width={"100%"}>
          <PlainTitle>Отправленные пульсы</PlainTitle>

          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} $height="150px" />
            ))
          ) : (
            <NotifList initialNotifs={notifs} role={RolesDict.CREATOR} />
          )}
        </Flex>
      </Main>
    </>
  );
};
