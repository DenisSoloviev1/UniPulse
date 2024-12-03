import React from "react";
import { Notif } from "../";
import { INotif } from "../model";
import { Roles } from "../../../shared/types";
import { Flex } from "../../../shared/ui";
import { Message } from "./style";

interface NotifListProps {
  initialNotifs: INotif[]; // Список уведомлений
  role: Roles; // Роль пользователя
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
            <Notif
              key={notifItem.id}
              {...notifItem} // Передача всех свойств уведомления в компонент
              role={role} // Роль передаётся из списка
            />
          ))
        ) : (
          <Message>Уведомлений нет</Message>
        )}
      </Flex>
    </article>
  );
};
