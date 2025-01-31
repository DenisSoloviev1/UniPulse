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
    toggleChatToMain: handleToggleChatToMain,
    allChats,
    loadChats,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useChatStore();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const [searchQueryInModal, setSearchQueryInModal] = useState("");

  const filteredChats = useMemo(() => {
    const res = allChats.reduce((acc, chat) => {
      if (
        !chat.is_main &&
        chat.name.toLowerCase().includes(searchQueryInModal.toLowerCase())
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
      {!isLoading && (
        <>
          <Modal
            renderProp={(setIsOpen) => (
              <ModalContent $height="auto" onClick={(e) => e.stopPropagation()}>
                <h3>Список всех чатов</h3>
                <Flex
                  $width="100%"
                  $align="center"
                  $direction="column"
                  $gap={10}
                >
                  <SearchInput
                    searchQuery={searchQueryInModal}
                    setSearchQuery={(query: string) =>
                      setSearchQueryInModal(query)
                    }
                  />
                  {filteredChats.length > 0 &&
                    filteredChats.map((chat) => (
                      <CustomButton
                        $style="blue"
                        key={"btn_" + chat.chat_id}
                        $width="70%"
                        onClick={() => {
                          handleToggleChatToMain(chat.chat_id);
                          setIsOpen((prev) => !prev);
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
          <ChatList />
        </>
      )}
      {isLoading && <Loader size="" />}
    </Flex>
  );
};
