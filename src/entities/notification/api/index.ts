import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const getPulsList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/notification`);
    return response.data; // если нужно вернуть данные из функции
  } catch (error) {
    console.error("Ошибка:", error);
    throw error; // если хотите пробросить ошибку для внешней обработки
  }
};
