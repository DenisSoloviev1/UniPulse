import { apiRequest } from "../../../shared/config/api";
import { INotif } from "../model";

/**
 * Получение всех уведомлений.
 * @returns Promise с массивом уведомлений.
 */
export const getNotifs = async (): Promise<INotif[]> => {
  const response = await apiRequest<INotif[]>("GET", "/api/notifications/user");
  if (!response.success) {
    throw new Error(response.error || "Не удалось загрузить уведомления.");
  }
  return response.data;
};
