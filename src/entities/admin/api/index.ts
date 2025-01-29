
import { apiRequest } from "../../../shared/config";
import { IChat } from "../model";

export const getChats = async (
//   id: string | null
): Promise<IChat[]> => {
  const response = await apiRequest<IChat[]>("POST", "/api/chats", { // исправить
    // id,
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка получения чатов.");
  }
  return response.data;
};