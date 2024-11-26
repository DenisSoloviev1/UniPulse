import { apiRequest } from "../../../shared/config/api";
import { ITag } from "../model";

/**
 * Добавление нового тега.
 * @param name - Название тега.
 * @param description - Описание тега.
 * @returns Promise с данными созданного тега.
 */
export const addTag = async (
  name: string,
  description: string
): Promise<ITag> => {
  const response = await apiRequest<ITag>("POST", "/api/tags", {
    name,
    description,
    subscriptable: true,
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка при создании тега.");
  }
  return response.data;
};

/**
 * Получение всех тегов для отправки удведомлений.
 * @returns Promise с массивом тегов.
 */
export const getTags = async (): Promise<ITag[]> => {
  const response = await apiRequest<ITag[]>("GET", "/api/tags");
  if (!response.success) {
    throw new Error(response.error || "Не удалось загрузить теги.");
  }
  return response.data;
};

/**
 * Получение всех тегов, на которые можно подписаться.
 * @returns Promise с массивом тегов.
 */
export const getSubscriptionTags = async (): Promise<ITag[]> => {
  const response = await apiRequest<ITag[]>("GET", "/api/tags/subscriptable");
  if (!response.success) {
    throw new Error(response.error || "Не удалось загрузить теги.");
  }
  return response.data;
};

/**
 * Редактирование старого тега.
 * @param id - id тега.
 * @param name - Название тега.
 * @param description - Описание тега.
 * @returns Promise с данными созданного тега.
 */
export const editTag = async (
  id: string,
  name: string,
  description: string
): Promise<ITag> => {
  const response = await apiRequest<ITag>("POST", `/api/tags/${id}`, {
    name,
    description,
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка при редактировании тега.");
  }
  return response.data;
};

/**
 * Удаление тега.
 * @param id - id тега.
 * @returns Promise с данными удалённого тега.
 */
export const deleteTag = async (
  id: number,
): Promise<ITag> => {
  const response = await apiRequest<ITag>("POST", "/api/tags/delete", {
    id
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка при удалении тега.");
  }
  return response.data;
};

/**
 * Подписка на тег.
 * @param id - id тега для подписки.
 * @returns Promise с результатом операции.
 */
export const subscribeToTag = async (id: number): Promise<boolean> => {
  const response = await apiRequest<null>(
    "POST",
    `/api/tags/subscript/${id}`
  );

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
  const response = await apiRequest<any[]>("GET", "/api/tags/subscriptions");

  if (!response.success) {
    throw new Error(response.error || "Не удалось загрузить подписки.");
  }

  // Извлекаем поле `tag` из каждой подписки.
  return response.data.map((sub: { tag: ITag }) => sub.tag);
};
