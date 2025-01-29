import React from "react";
import { IChat } from "../../entities/admin/model";
import { CustomButton, Flex } from "../../shared/ui";
import { ChatItem } from "../ChatItem/ChatItem";
import { ModalContent } from "../../shared/ui/ModalWindow/style";
import { Modal } from "../../shared/ui/ModalWindow/indexNew";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useChats } from "../../shared/hooks/useChats";

interface ChatListProps {
  chats: (IChat & { secondaryChats: IChat[] })[];
  selectedChats: number[];
  handleCheckboxChange: (chatId: number) => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChats,
  handleCheckboxChange,
}) => {
  const { allSecondaryChats } = useChats();

  return (
    <Flex $direction="column" $width="100%" $gap={20}>
      <Modal
        renderProp={() => (
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Список всех дочерних чатов</h3>
            <Flex $direction="column" $gap={10}>
              {allSecondaryChats.map((secondaryChat) => (
                <div key={secondaryChat.chat_id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedChats.includes(secondaryChat.chat_id)}
                        onChange={() =>
                          handleCheckboxChange(secondaryChat.chat_id)
                        }
                      />
                    }
                    label={secondaryChat.name}
                  />
                </div>
              ))}
            </Flex>
          </ModalContent>
        )}
      >
        <CustomButton $style="blue">Добавить чат</CustomButton>
      </Modal>
      {chats.map((chat) => (
        <Flex $direction="row" $width="100%" key={chat.chat_id}>
          <ChatItem
            chat={chat}
            selectedChats={selectedChats}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Flex>
      ))}
    </Flex>
  );
};
