import axios from "axios";
import {apiRequest, baseUrl} from "../../../shared/config";

export const getUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/.......`);
    return response.data; // если нужно вернуть данные из функции
  } catch (error) {
    console.error("Ошибка:", error);
    throw error; // если хотите пробросить ошибку для внешней обработки
  }
};

export const addTelegramChannel = async (
    id: string | null
): Promise<{ success: boolean; message: string }> => {
  const response = await apiRequest<void>("POST", "/api/channels/add/tg", {
    id,
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка при добавлении Telegram-канала.");
  }
  return { success: true, message: "Telegram-канал успешно добавлен." };
};

