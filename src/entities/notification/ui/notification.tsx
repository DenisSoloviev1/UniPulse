import React, { useState } from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif } from "../model";
import { formatDate, isMobile } from "../../../shared/config";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { PlainTitle, ModalWindow, Slider } from "../../../shared/ui";
import { Roles, RolesDict } from "../../../shared/types";
import { MoreInfo, EditNotif, SubmitNotif } from "../../../widjets/Notif";

type NotifProps = INotif & {
  role: Roles;
};

export const Notif: React.FC<NotifProps> = ({
  id,
  title,
  description,
  status,
  files,
  time,
  tags,
  role,
}) => {
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);

  const [selectNotif, setSelectNotif] = useState<INotif>({
    id,
    title,
    description,
    status,
    time,
    files,
    tags,
  });

  const getModalKey = (role: Roles, notifId: number) => `${role}-${notifId}`;

  const isOpenEditNotif = useModalStore((state) =>
    state.isOpen(getModalKey(RolesDict.CREATOR, selectNotif.id))
  );
  const isOpenMoreInfo = useModalStore((state) =>
    state.isOpen(getModalKey(RolesDict.USER, selectNotif.id))
  );
  const isOpenSubmitNotif = useModalStore((state) =>
    state.isOpen(getModalKey(RolesDict.MEDIA, selectNotif.id))
  );

  const handleNotifClick = (notif: INotif) => {
    setSelectNotif(notif);
    openModal(getModalKey(role, notif.id));
  };

  const formattedDate = formatDate(time);

  return (
    <>
      <Container
        $width={"100%"}
        onClick={() =>
          handleNotifClick({
            id,
            title,
            description,
            status,
            time,
            files,
            tags,
          })
        }
      >
        <Flex $gap={isMobile ? 10 : 15}>
          <Flex
            $width={"100%"}
            $direction={"row"}
            $align={"center"}
            $justify={"space-between"}
            $gap={10}
          >
            <Title>{title}</Title>

            <Flex $direction={"row"} $align={"center"} $gap={15}>
              {!isMobile && <Time>{formattedDate}</Time>}
              {role !== RolesDict.USER && (
                <Status $status={status}>{StatusNotif[status]}</Status>
              )}
            </Flex>
          </Flex>

          <Text>{description}</Text>
          <Flex $direction={"row"} $align={"center"} $wrap={true}>
            {Array.isArray(tags) &&
              tags
                .filter((tag) => tag && typeof tag === "object" && "id" in tag)
                .map((tag) => (
                  <Tag
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    style={"light"}
                  />
                ))}
          </Flex>
        </Flex>
      </Container>

      <ModalWindow
        onClick={() => closeModal(getModalKey(role, selectNotif.id))}
        show={isOpenMoreInfo || isOpenEditNotif || isOpenSubmitNotif}
        width={isMobile ? "90%" : "50%"}
        height={isMobile ? "70%" : "90%"}
      >
        {role === RolesDict.USER || selectNotif.status === "sent" ? (
          <Slider $padding={5}>
            <MoreInfo notifData={selectNotif} />
          </Slider>
        ) : role === RolesDict.MEDIA ? (
          <Slider $padding={5}>
            <SubmitNotif notifData={selectNotif} />
          </Slider>
        ) : role === RolesDict.CREATOR ? (
          <Flex $gap={10} $width={"100%"}>
            <PlainTitle style={{ fontSize: "30px", fontWeight: "500" }}>
              Редактирование
            </PlainTitle>
            <Slider $padding={5}>
              <EditNotif notifData={selectNotif} />
            </Slider>
          </Flex>
        ) : null}
      </ModalWindow>
    </>
  );
};
