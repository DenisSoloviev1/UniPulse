import { Flex } from "../../shared/ui";
import { ChatItem } from "../ChatItem/ChatItem";
import useChatStore from "../admin/store/chatStore";
import { IChat } from "../../entities/admin/model";

export const ChatList = () => {
  const { searchQuery: searchQueryMain } = useChatStore();

  const { allChats } = useChatStore();

  return (
    <Flex $direction="column" $width="100%" $gap={20}>
      {allChats
        .reduce((acc, chat) => {
          if (!chat.is_main) return acc;
          if (chat.name.toLowerCase().includes(searchQueryMain.toLowerCase()))
            return [...acc, chat];
          return acc;
        }, [] as IChat[])
        .map((chat) => (
          <Flex $direction="row" $width="100%" key={chat.chat_id}>
            <ChatItem chat={chat} />
          </Flex>
        ))}
    </Flex>
  );
};
