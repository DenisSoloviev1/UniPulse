import axios from "axios";
import { baseUrl } from "../../../shared/config";

export const getPuls = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`${baseUrl}/api/notification/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // если нужно вернуть данные из функции
  } catch (error) {
    console.error("Ошибка:", error);
    throw error; // если хотите пробросить ошибку для внешней обработки
  }
};
