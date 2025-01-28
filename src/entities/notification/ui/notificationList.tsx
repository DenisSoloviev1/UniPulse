import React from "react";
import { Notif } from "../";
import { INotif } from "../model";
import { Roles } from "../../../shared/types";
import { Flex } from "../../../shared/ui";
import { Message, WrapperFilters } from "./style";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFilters } from "../../../shared/hooks/useFilters";

const MOCK_SUBS = [
  { id: 1, name: "Всё" },
  { id: 529, name: "Опорный вуз" },
  { id: 530, name: "Наука" },
  { id: 531, name: "Образование" },
  { id: 532, name: "Международная деятельность" },
  { id: 533, name: "Спорт" },
  { id: 534, name: "Интервью" },
  { id: 535, name: "СМИ о нас" },
  { id: 539, name: "Жизнь университета" },
];
// потом привязаться к тому что приходит с апи

const MOCK_SORTS = ["Сначала новые", "Сначала старые"];

interface NotifListProps {
  initialNotifs: INotif[];
  role: Roles;
}

export const NotifList: React.FC<NotifListProps> = ({
  initialNotifs,
  role,
}) => {
  const { filteredArr, setGroupId, setSort } = useFilters(initialNotifs);

  return (
    <article style={{ width: "100%" }}>
      {/* инлайновые стили зло  */}
      <Flex $gap={10}>
        <WrapperFilters>
          <Select
            onChange={(e) => {
              setGroupId(+e.target.value);
            }}
            defaultValue={1} // 1 это айди для группы всё
          >
            {MOCK_SUBS.map(({ id, name }) => (
              <MenuItem key={name + "_" + id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Select
            onChange={(e) => setSort(+e.target.value === 0 ? "desc" : "asc")}
            defaultValue={0}
          >
            {MOCK_SORTS.map((sortElem, i) => (
              <MenuItem key={sortElem + i} value={i}>
                {sortElem}
              </MenuItem>
            ))}
          </Select>
        </WrapperFilters>
        {!!initialNotifs.length &&
          filteredArr.map((notifItem, i) => (
            <Notif
              key={notifItem.id + "_notif_" + i}
              {...notifItem}
              role={role}
            />
          ))}
        {!initialNotifs.length && <Message>Пусто</Message>}
      </Flex>
    </article>
  );
};
