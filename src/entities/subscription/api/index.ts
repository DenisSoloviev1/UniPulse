import { apiRequest } from "../../../shared/config/api";
import { ITag } from "../../tag";
import { ISubscription } from "../model";

/**
 * Подписка на тег.
 * @param id - id тега для подписки.
 * @returns Promise с результатом операции.
 */
export const subscribeToTag = async (id: ISubscription["id"]): Promise<boolean> => {
  const response = await apiRequest<null>("POST", `/api/tags/subscript/${id}`);

  if (!response.success) {
    throw new Error(response.error || "Ошибка подписки на тег.");
  }
  return response.success;
};

/**
 * Получение всех подписок.
 * @returns Promise с массивом тегов, на которые пользователь подписан.
 */
export const getSubscriptions = async (): Promise<ITag[]> => {
  const response = await apiRequest<ISubscription[]>("GET", "/api/tags/subscriptions");

  if (!response.success) {
    throw new Error(response.error || "Не удалось загрузить подписки.");
  }

  // Извлекаем поле `tag` из каждой подписки.
  return response.data.map((subscription) => subscription.tag);
};

/**
 * Удаление подписки.
 * @param id - id подписки.
 * @returns Promise с данными удалённой подписки.
 */
export const deleteSubscriptions = async (id: ISubscription["id"]): Promise<ISubscription> => {
  const response = await apiRequest<ISubscription>(
    "POST",
    "/api/tags/subscriptions/cancel",
    {
      id,
    }
  );

  if (!response.success) {
    throw new Error(response.error || "Ошибка при удалении подписки.");
  }
  return response.data;
};
