import React, { ReactNode } from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif } from "../model";
import { formatDate } from "../../../shared/config";
import { Roles, RolesDict } from "../../../shared/types";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { Modal } from "../../../shared/ui/ModalWindow/indexNew";
import { ModalContent } from "../../../shared/ui/ModalWindow/style";
import { Icons } from "./icons";
import { SlidersFactory } from "./SlidersFactory";

export type NotifProps = INotif & {
  role: Roles;
};

export const Notif: React.FC<NotifProps> = (notificationProp) => {
  const { title, description, status, files, time, tags, role } =
    notificationProp;
  const { isMobile } = useIsMobile();

  const formattedDate = formatDate(time);

  const slider = SlidersFactory(notificationProp);

  return (
    <Modal
      renderProp={() => (
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          $width={isMobile ? "90%" : "50%"}
          $height="90%"
        >
          {(role === RolesDict.USER || status !== "wait_submit") && slider.USER}
          {role === RolesDict.MEDIA && slider.MEDIA}
          {role === RolesDict.CREATOR && slider.CREATOR}

          {/* Протестить на других ролях */}
          {/* еще можно написать slider.[role], но мешает условие по статусу */}
        </ModalContent>
      )}
    >
      <Container $width={"100%"}>
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

          <Flex
            $width={"100%"}
            $direction={"row"}
            $justify={"space-between"}
            $align={"center"}
          >
            <Flex $direction={"row"} $align={"center"} $wrap={true}>
              {tags.reduce((acc, tag) => {
                if (!(tag && typeof tag === "object" && "id" in tag))
                  return acc;
                return [
                  ...acc,
                  <Tag
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    style={"light"}
                  />,
                ];
              }, [] as ReactNode[])}
            </Flex>

            <Icons files={files} />
          </Flex>
        </Flex>
      </Container>
    </Modal>
  );
};
