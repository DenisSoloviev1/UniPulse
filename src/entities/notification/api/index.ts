import { apiRequest } from "../../../shared/config/api";
import { ITag } from "../../tag";
import { INotif } from "../model";
import { Roles } from "../../../shared/types";

/**
 * Создание нового уведомления.
 * @param title - Название уведомления.
 * @param description - Описание уведомления.
 * @param tags - Теги, которые получат это уведомление.
 * @param time - Время получения уведомления.
 * @returns Promise с данными созданного уведомления.
 */
export const addNotif = async (
  title: INotif["title"],
  description: INotif["description"],
  files: INotif["files"],
  tags: ITag["id"][],
  time: INotif["time"]
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
 * @role - роль пользователя для получения заявок, относящихся к нему
 * @returns Promise с массивом уведомлений.
 */
export const getNotifs = async (role: Roles): Promise<INotif[]> => {
  const response = await apiRequest<INotif[]>(
    "GET",
    `/api/notifications/${role}`
  );
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
 * @param time - Время получения уведомления.
 * @returns Promise с данными созданного уведомления.
 */
export const editNotif = async (
  id: INotif["id"],
  title: INotif["title"],
  description: INotif["description"],
  files: INotif["files"],
  tags: INotif["id"][],
  time: INotif["time"]
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
export const deleteNotif = async (id: INotif["id"]): Promise<INotif> => {
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
export const submitNotif = async (id: INotif["id"]): Promise<INotif> => {
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
