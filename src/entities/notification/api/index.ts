import { apiRequest } from "../../../shared/config/api";
import { ITag } from "../../tag";
import { INotif } from "../model";

/**
 * Создание нового уведомления.
 * @param title - Название уведомления.
 * @param description - Описание уведомления.
 * @param tags - Теги, которые получат это уведомление.
 * @param time - Время отправки.
 * @returns Promise с данными созданного уведомления.
 */
export const addNotif = async (
  title: string,
  description: string,
  files: any[],
  tags: ITag["id"][],
  time: number
): Promise<INotif> => {
  const response = await apiRequest<INotif>("POST", "/api/notifications", {
    title,
    description,
    files,
    tags,
    time,
  });

  if (!response.success) {
    throw new Error(response.error || "Ошибка при создании уведомления.");
  }
  return response.data;
};

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

/**
 * Редактирование старого уведомления.
 * @param id - id редактируемого уведомления.
 * @param title - Название уведомления.
 * @param description - Описание уведомления.
 * @param files - Прикреплённые файлы.
 * @param tags - Теги, которые получат это уведомление.
 * @param time - Время отправки.
 * @returns Promise с данными созданного уведомления.
 */
export const editNotif = async (
  id: number,
  title: string,
  description: string,
  files: any[],
  tags: ITag[],
  time: number
): Promise<INotif> => {
  const response = await apiRequest<INotif>(
    "POST",
    `/api/notifications/${id}`,
    {
      title,
      description,
      files,
      tags,
      time,
    }
  );

  if (!response.success) {
    throw new Error(response.error || "Ошибка при редактировании уведомления.");
  }
  return response.data;
};

/**
 * Удаление уведомления.
 * @param id - id уведомления.
 * @returns Promise с данными удалённого уведомления.
 */
export const deleteTag = async (id: number): Promise<INotif> => {
  const response = await apiRequest<INotif>(
    "POST",
    "/api/notifications/delete",
    {
      id,
    }
  );

  if (!response.success) {
    throw new Error(response.error || "Ошибка при удалении уведомления.");
  }
  return response.data;
};

/**
 * Подтверждение создания уведомления.
 * @param id - id уведомления.
 * @returns Promise с данными подтверждаемого уведомления.
 */
export const submitTag = async (id: number): Promise<INotif> => {
  const response = await apiRequest<INotif>(
    "POST",
    `/api/notifications/${id}/submit`
  );

  if (!response.success) {
    throw new Error(
      response.error || "Ошибка при подтверждении создания уведомления."
    );
  }
  return response.data;
};
