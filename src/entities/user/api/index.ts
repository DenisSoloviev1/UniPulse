import { apiRequest } from "../../../shared/config";

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
