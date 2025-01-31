import { Flex } from "../../shared/ui";
import { ChatItem } from "../ChatItem/ChatItem";
import useChatStore from "../admin/store/chatStore";

export const ChatList = () => {
  const { searchQuery: searchQueryMain } = useChatStore();

  const { allChats } = useChatStore();

  const filteredChats = allChats.filter(
    (chat) =>
      chat.is_main &&
      chat.name.toLowerCase().includes(searchQueryMain.toLowerCase())
  );

  return (
    <Flex $direction="column" $width="100%" $gap={20}>
      {filteredChats.map((chat) => (
        <Flex $direction="row" $width="100%" key={chat.chat_id}>
          <ChatItem chat={chat} />
        </Flex>
      ))}
    </Flex>
  );
};
