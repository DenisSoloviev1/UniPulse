import { ChatList } from "../../features/ChatList/ChatList";
import { SearchInput } from "../../features/SearchInput/SearchInput";
import { useChats } from "../../shared/hooks/useChats";
import { CustomButton, Flex } from "../../shared/ui";

export const Admin = () => {
  const {
    chats: chatsWithSecondary,
    searchQuery,
    setSearchQuery,
    selectedChats,
    handleCheckboxChange,
  } = useChats();

  console.log(selectedChats);

  return (
    <Flex $width="100%" $direction="column" $gap={20}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ChatList
        chats={chatsWithSecondary}
        selectedChats={selectedChats}
        handleCheckboxChange={handleCheckboxChange}
      />
      <CustomButton $style="blue">Сохранить</CustomButton>
    </Flex>
  );
};
