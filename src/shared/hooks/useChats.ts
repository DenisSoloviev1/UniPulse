import { useMemo, useState } from 'react';
import { IChat } from '../../entities/admin/model';

const MOCK_DATA: IChat[] = [
  { chat_id: 1, chats: [2, 3, 4], is_main: true, name: "попа муровья" },
  { chat_id: 5, chats: [6, 7, 8], is_main: true, name: "попа жука" },
  { chat_id: 2, chats: [], is_main: false, name: "попа антона" },
  { chat_id: 3, chats: [], is_main: false, name: "попа дениса" },
  { chat_id: 4, chats: [], is_main: false, name: "попа моя" },
  { chat_id: 6, chats: [], is_main: false, name: "плохое имя" },
  { chat_id: 7, chats: [], is_main: false, name: "хорошее имя" },
  { chat_id: 8, chats: [], is_main: false, name: "другое имя" },
];

export const useChats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChats, setSelectedChats] = useState<number[]>([]);
  const mainChats = useMemo(() => MOCK_DATA.filter((el) => el.is_main), [MOCK_DATA]);

  const handleCheckboxChange = (chatId: number) => {
    if (selectedChats.includes(chatId)) {
      setSelectedChats(selectedChats.filter((id) => id !== chatId));
    } else {
      setSelectedChats([...selectedChats, chatId]);
    }
  };

  const findParentMainChat = (chatId: number): IChat | undefined => {
    return mainChats.find((mainChat) =>
      mainChat.chats.includes(chatId)
    );
  };

  const getSecondaryChatsForMainChat = (mainChat: IChat) => {
    return MOCK_DATA.filter(
      (chat) =>
        !chat.is_main &&
        mainChat.chats.includes(chat.chat_id) &&
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredChats = useMemo(() => {
    if (!searchQuery) return mainChats;

    const lowerCaseQuery = searchQuery.toLowerCase();

    const foundMainChats = mainChats.filter((chat) =>
      chat.name.toLowerCase().includes(lowerCaseQuery)
    );

    const foundSecondaryChats = MOCK_DATA.filter(
      (chat) =>
        !chat.is_main && chat.name.toLowerCase().includes(lowerCaseQuery)
    );

    const resultChats = new Set<IChat>([...foundMainChats]);

    foundSecondaryChats.forEach((secondaryChat) => {
      const parentMainChat = findParentMainChat(secondaryChat.chat_id);
      if (parentMainChat) {
        resultChats.add(parentMainChat);
      } else {
        resultChats.add(secondaryChat);
      }
    });

    return Array.from(resultChats).filter(
      (chat, index, self) =>
        self.findIndex((c) => c.chat_id === chat.chat_id) === index
    );
  }, [searchQuery, mainChats, MOCK_DATA]);

  const getAllSecondaryChats = (): IChat[] => {
    return MOCK_DATA.filter((chat) => !chat.is_main);
  };

  const getAllChats = (): IChat[] => {
    return MOCK_DATA;
  };

  return {
    chats: filteredChats.map((chat) => ({
      ...chat,
      secondaryChats: getSecondaryChatsForMainChat(chat),
    })),
    searchQuery,
    setSearchQuery,
    selectedChats,
    handleCheckboxChange,
    allSecondaryChats: getAllSecondaryChats(),
    allChats: getAllChats(),
  };
};