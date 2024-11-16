import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const getSubscriptions = async (token?: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/tags/subscriptions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Проверяем успешность ответа и возвращаем только массив тегов
    if (response.data?.success) {
      const subscriptions = response.data.data || [];
      // Извлекаем поле `tag` из каждой подписки
      return subscriptions.map((subscription: any) => subscription.tag);
    }

    return [];
  } catch (error: any) {
    console.error("Ошибка при получении подписок:", error.response);
    throw error;
  }
};
