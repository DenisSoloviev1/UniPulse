import React from "react";
import { Notif } from "../";
import { INotif } from "../model";
import { Roles } from "../../../shared/types";
import { Flex } from "../../../shared/ui";
import { Message } from "./style";

interface NotifListProps {
  initialNotifs: INotif[];
  role: Roles;
}

export const NotifList: React.FC<NotifListProps> = ({
  initialNotifs,
  role,
}) => {
  return (
    <article style={{ width: "100%" }}>
      <Flex $gap={10}>
        {initialNotifs.length > 0 ? (
          initialNotifs.map((notifItem) => (
            <Notif key={notifItem.id} {...notifItem} role={role} />
          ))
        ) : (
          <Message>Пусто</Message>
        )}
      </Flex>
    </article>
  );
};
