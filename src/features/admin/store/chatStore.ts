// src/features/admin/store/chatStore.ts
import { create } from 'zustand';
import { IChat } from '../../../entities/admin/model';
import { getChats } from '../../../entities/admin/api';

type ChatState = {
  chats: (IChat & { secondaryChats: IChat[] })[];
  secondChats: IChat[];
  isLoading: boolean;
  searchQuery: string;
  mainChats: IChat[];
  selectedChats: number[];
  allSecondaryChats: IChat[];
  allChats: IChat[];
  setSearchQuery: (query: string) => void;
  handleCheckboxChange: (chatId: number) => void;
  initializeChats: () => void;
  loadChats: () => void;
  getSecondChats: (chats: number[]) => IChat[];
  getChatById: (id: number) => IChat | null;
  toggleChatToMain: (id: number) => void;
  getAllSecondChats: () => IChat[];
};

const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  isLoading: false,
  searchQuery: ' ',
  secondChats: [],
  mainChats: [],
  selectedChats: [],
  allSecondaryChats: [],
  allChats: [],
  getAllSecondChats: () => get().allChats.filter(chat => !chat.is_main),
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().initializeChats();
  },
  handleCheckboxChange: (chatId: number) => {
    const { selectedChats } = get();
    if (selectedChats.includes(chatId)) {
      set({ selectedChats: selectedChats.filter((id) => id !== chatId) });
    } else {
      set({ selectedChats: [...selectedChats, chatId] });
    }
  },
  initializeChats: () => {
    const mainChats = get().allChats.filter((el) => el.is_main);
    const searchQuery = get().searchQuery;

    const filteredChats = (() => {
      if (!searchQuery) return mainChats;

      const lowerCaseQuery = searchQuery.toLowerCase().trim();

      const foundMainChats = mainChats.filter((chat) =>
        chat.name.toLowerCase().includes(lowerCaseQuery)
      );

      const foundSecondaryChats = get().allChats.filter(
        (chat) =>
          !chat.is_main && chat.name.toLowerCase().includes(lowerCaseQuery)
      );

      const resultChats = new Set<IChat>([...foundMainChats]);

      foundSecondaryChats.forEach((secondaryChat) => {
        const parentMainChat = mainChats.find((mainChat) =>
          mainChat.chats?.includes(secondaryChat.chat_id)
        );
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
    })();

    const getSecondaryChatsForMainChat = (mainChat: IChat) => {
      return get().allChats.filter(
        (chat) =>
          !chat.is_main &&
          mainChat.chats?.includes(chat.chat_id) &&
          chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    set({
        mainChats: mainChats,
      chats: filteredChats.map((chat) => ({
        ...chat,
        secondaryChats: getSecondaryChatsForMainChat(chat),
      })),
    });
  },
  loadChats: async () => {
    try {
      set({ isLoading: true });
      const chats = await getChats();
      const allSecondaryChats = chats.filter((chat) => !chat.is_main);
      set({
        allChats: chats,
        allSecondaryChats: allSecondaryChats,
      });
      get().initializeChats(); // После загрузки данных инициализируем чаты
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
  getSecondChats: (idOfChats: number[] | null) =>{
    // console.log(idOfChats)
    return idOfChats?.length ? get().allChats.filter(chat => idOfChats.includes(chat.chat_id)) : [] 
  },
  getChatById: (id: number) => {
    return get().allChats.find(chat => chat.chat_id === id) || null
  },
  toggleChatToMain: (id: number) => {
    const chat = get().getChatById(id)!
    const currentChat: IChat = {...chat,is_main: true };
    set({mainChats: [...get().mainChats, currentChat], allChats: [...get().allChats.filter(chat => chat.chat_id !== id), currentChat ], secondChats: [...get().secondChats.filter(chat => chat.chat_id !== id), ]} )
  }
}));

export default useChatStore;