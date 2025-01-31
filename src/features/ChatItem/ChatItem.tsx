import React, { useCallback, useState } from "react";
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
import { ComplitedSvg, NotFoundSvg, Pen } from "../../shared/ui/Icon";
import { CustomButton, Flex } from "../../shared/ui";
import styled from "styled-components";
import useChatStore from "../admin/store/chatStore";
import { SearchInput } from "../SearchInput/SearchInput";
import { deleteChat, editMainChat } from "../../entities/admin/api";
import { ChildrenChatItem } from "./childrenChatItem";
import { toast } from "react-toastify";

export const ChatLabel = styled.div`
  padding: 10px;
  box-shadow: 0 0 5px 1px #adb5bd;
  border-radius: 10px;
  width: 100%;
  background-color: var(--color-background-container);
`;

interface ChatItemProps {
  chat: IChat;
}

const StyledAccordio = styled(Accordion)<AccordionProps>`
  width: 100%;
`;

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const { allChats, loadChats } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");

  const notify = (isSuccesse: boolean) =>
    toast(
      isSuccesse ? (
        <>
          Успешно изменено
          <ComplitedSvg height="40px" width="40px" />
        </>
      ) : (
        <div>
          Что-то пошло не так <NotFoundSvg height="40px" width="40px" />
        </div>
      ),
      { style: { width: "250px" } }
    );

  const filteredChats = allChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const secondChats = useChatStore().getSecondChats(chat.chats);

  const [selectedChatsId, setSelectedChatsId] = useState<number[]>(
    secondChats.map((el) => el.chat_id)
  );

  const handleChange = useCallback((id: number, checked: boolean) => {
    setSelectedChatsId((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((ChatId) => ChatId !== id);
      }
    });
  }, []);

  const handleSaveConfigChat = async () => {
    const isSuccesse = await editMainChat(chat.chat_id, selectedChatsId);
    notify(isSuccesse);
    loadChats();
  };

  const handleDeleteSettingsChat = async () => {
    const isSuccesse = await deleteChat(chat.chat_id);
    notify(isSuccesse);
    loadChats();
  };

  return (
    <Flex $width="100%" $align="center" $gap={10} $direction="row">
      <StyledAccordio onClick={(e) => e.stopPropagation()}>
        <AccordionSummary onClick={(e) => e.stopPropagation()}>
          <Flex
            $width="100%"
            $direction="row"
            $justify="space-between"
            $align="center"
          >
            {chat.name}
          </Flex>
        </AccordionSummary>
        <AccordionDetails>
          <Flex $direction="column" $padding="10px" $gap={15}>
            {secondChats?.map((secondaryChat, i) => (
              <ChatLabel key={i + "_label_" + chat.chat_id}>
                {secondaryChat.name}
              </ChatLabel>
            ))}
          </Flex>
        </AccordionDetails>
      </StyledAccordio>
      <Modal
        renderProp={(setIsOpen) => (
          <ModalContent
            $position={["relative"]}
            $height="800px"
            $width="70%"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Настройка чата: {chat.name}</h3>
            <StyledAccordio>
              <AccordionSummary>
                <h3>Добавленные чаты:</h3>
              </AccordionSummary>
              <AccordionDetails>
                {secondChats.map((chat) => (
                  <Flex
                    key={chat.chat_id + "__"}
                    $overflow="overlay"
                    $direction="column"
                    $width="90%"
                    $gap={10}
                    $padding="10px"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={true}
                          checked={selectedChatsId.includes(chat.chat_id)}
                          onChange={(e) =>
                            handleChange(chat.chat_id, e.target.checked)
                          }
                        />
                      }
                      label={chat.name}
                    />
                  </Flex>
                ))}
              </AccordionDetails>
            </StyledAccordio>
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <h3>Выбор всех чатов </h3>
            <Flex
              $overflow="overlay"
              $direction="column"
              $width="90%"
              $gap={10}
              $padding="10px"
            >
              {filteredChats.map((chat) => (
                <ChildrenChatItem
                  key={chat.chat_id}
                  handleChange={handleChange}
                  selectedChatsId={selectedChatsId}
                  {...chat}
                />
              ))}
            </Flex>
            <Flex $direction="row" $width="100%" $gap={50} $justify="center">
              <CustomButton
                onClick={() => {
                  handleDeleteSettingsChat();
                  setIsOpen((prev) => !prev);
                }}
                $style="red"
              >
                Сбросить настройки
              </CustomButton>
              <CustomButton
                onClick={() => {
                  handleSaveConfigChat();
                  setIsOpen((prev) => !prev);
                }}
                $style="blue"
              >
                Сохранить
              </CustomButton>
            </Flex>
          </ModalContent>
        )}
      >
        <CustomButton $style="blue">
          <Pen />
        </CustomButton>
      </Modal>
    </Flex>
  );
};
