import { apiRequest } from "../../../shared/config";
import { IUser } from "../model";

/**
 * Подключение профиля в телеграмм.
 * @param id - id чата с ботом.
 * @returns Promise с данными успешного добавления.
 */
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

/**
 * Получение роли пользователя при обновлении страницы.
 * @returns Promise с ролью пользователя.
 */
export const getRole = async (): Promise<IUser["role"]> => {
  const response = await apiRequest<IUser>("GET", "/api/users/profile");

  if (!response.success) {
    throw new Error(response.error || "Ошибка получения роли");
  }
  return response.data.role;
};
