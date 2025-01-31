// src/features/admin/Admin.tsx

import { useEffect, useMemo, useState } from "react";
import useChatStore from "../../features/admin/store/chatStore";
import { CustomButton, Flex, Loader } from "../../shared/ui";
import { SearchInput } from "../../features/SearchInput/SearchInput";
import { ChatList } from "../../features/ChatList/ChatList";
import { Modal } from "../../shared/ui/ModalWindow/indexNew";
import { ModalContent } from "../../shared/ui/ModalWindow/style";
import { IChat } from "../../entities/admin/model";

export const Admin = () => {
  const {
    allChats,
    loadChats,
    toggleChatToMain: handleToggleChatToMain,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useChatStore();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const [searchQueryInModal, setSearchQueryInModal] = useState("");

  const filteredChats = useMemo(() => {
    const filteredChat = allChats.filter((chat) => !chat.is_main);
    const res = filteredChat.reduce((acc, chat) => {
      if (
        chat.name
          .toLowerCase()
          .includes(searchQueryInModal.trim().toLowerCase())
      ) {
        return [...acc, chat];
      }
      return acc;
    }, [] as IChat[]);
    return res;
  }, [allChats, searchQueryInModal]);

  return (
    <Flex
      $width="100%"
      $overflow="hidden"
      $direction="column"
      $padding="10px"
      $gap={20}
      style={{ minHeight: "82vh" }}
    >
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Modal
        renderProp={() => (
          <ModalContent $height="auto" onClick={(e) => e.stopPropagation()}>
            <h3>Список всех чатов</h3>
            <Flex $width="100%" $align="center" $direction="column" $gap={10}>
              <SearchInput
                searchQuery={searchQueryInModal}
                setSearchQuery={setSearchQueryInModal}
              />
              {filteredChats.length > 0 &&
                filteredChats.map((chat) => (
                  <CustomButton
                    $style="blue"
                    key={"btn_" + chat.chat_id}
                    $width="70%"
                    onClick={() => {
                      handleToggleChatToMain(chat.chat_id);
                    }}
                  >
                    {chat.name}
                  </CustomButton>
                ))}
            </Flex>
          </ModalContent>
        )}
      >
        <CustomButton $style="blue">Выбрать чат</CustomButton>
      </Modal>
      {isLoading && <Loader size="" />}
      {!isLoading && <ChatList />}
    </Flex>
  );
};
