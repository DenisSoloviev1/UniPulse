import React, { useMemo } from "react";
import { Notif } from "../";
import { INotif } from "../model";
import { Roles } from "../../../shared/types";
import { Flex } from "../../../shared/ui";
import { Message, WrapperFilters } from "./style";
import { useFilters } from "../../../shared/hooks/useFilters";
import { StyledMenuItem, StyledSelect } from "../../../shared/ui/Select/Select";
import { useTagStore } from "../../tag";

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

  const { subscriptionToTags } = useTagStore();

  const subscriptedTags = useMemo(() => {
    const res = subscriptionToTags.map((tag) => {
      return { id: tag.id, name: tag.name };
    });
    res.unshift({ id: 1, name: "Всё" });
    return res;
  }, [subscriptionToTags]);

  return (
    <article style={{ width: "100%" }}>
      <Flex $gap={10}>
        <WrapperFilters>
          <StyledSelect
            onChange={(e) => {
              setGroupId(e.target.value as number);
            }}
            defaultValue={1} // 1 это айди для группы все
          >
            {subscriptedTags.map(({ id, name }) => (
              <StyledMenuItem key={name + "_" + id} value={id}>
                {name}
              </StyledMenuItem>
            ))}
          </StyledSelect>
          <StyledSelect
            onChange={(e) =>
              setSort((e.target.value as number) === 0 ? "desc" : "asc")
            }
            defaultValue={0}
          >
            {MOCK_SORTS.map((sortElem, i) => (
              <StyledMenuItem key={sortElem + i} value={i}>
                {sortElem}
              </StyledMenuItem>
            ))}
          </StyledSelect>
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
