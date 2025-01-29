import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionProps,
} from "@mui/material";
import { IChat } from "../../entities/admin/model";
import { ModalContent } from "../../shared/ui/ModalWindow/style";
import { Modal } from "../../shared/ui/ModalWindow/indexNew";
import { Plus } from "../../shared/ui/Icon";
import { CustomButton, Flex } from "../../shared/ui";
import styled from "styled-components";
import { useChats } from "../../shared/hooks/useChats";

interface ChatItemProps {
  chat: IChat & { secondaryChats: IChat[] };
  selectedChats: number[];
  handleCheckboxChange: (chatId: number) => void;
}

const StyledAccordio = styled(Accordion)<AccordionProps>`
  width: 100%;
`;

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  selectedChats,
  handleCheckboxChange,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const { allChats } = useChats();

  const handleAccordionChange = (isExpanded: boolean) => {
    setExpanded(isExpanded);
    if (isExpanded && chat.is_main && !selectedChats.includes(chat.chat_id)) {
      handleCheckboxChange(chat.chat_id);
    } else if (
      !isExpanded &&
      chat.is_main &&
      selectedChats.includes(chat.chat_id)
    ) {
      handleCheckboxChange(chat.chat_id);
    }
  };

  const handleSecondaryChatChange = (secondaryChat: IChat) => {
    handleCheckboxChange(secondaryChat.chat_id);
  };

  return (
    <StyledAccordio
      expanded={expanded}
      onChange={(_, isExpanded) => handleAccordionChange(isExpanded)}
    >
      <AccordionSummary>
        <Flex
          $width="100%"
          $direction="row"
          $justify="space-between"
          $align="center"
        >
          {chat.name}
          <Modal
            renderProp={() => (
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <h3>Выбор всех чатов</h3>
                <Flex $direction="column" $gap={10}>
                  {allChats.map((chat) => (
                    <div key={chat.chat_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedChats.includes(chat.chat_id)}
                            onChange={() => handleCheckboxChange(chat.chat_id)}
                          />
                        }
                        label={chat.name}
                      />
                    </div>
                  ))}
                </Flex>
              </ModalContent>
            )}
          >
            <CustomButton $style="blue">
              <Plus />
            </CustomButton>
          </Modal>
        </Flex>
      </AccordionSummary>
      <AccordionDetails>
        <Flex $direction="column" $gap={15}>
          {chat.is_main ? (
            chat.secondaryChats.map((secondaryChat) => (
              <FormControlLabel
                key={secondaryChat.chat_id}
                control={
                  <Checkbox
                    checked={selectedChats.includes(secondaryChat.chat_id)}
                    onChange={() => handleSecondaryChatChange(secondaryChat)}
                  />
                }
                label={secondaryChat.name}
              />
            ))
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedChats.includes(chat.chat_id)}
                  onChange={() => handleCheckboxChange(chat.chat_id)}
                />
              }
              label={chat.name}
            />
          )}
        </Flex>
      </AccordionDetails>
    </StyledAccordio>
  );
};
