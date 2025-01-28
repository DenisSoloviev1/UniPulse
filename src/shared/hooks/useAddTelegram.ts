import { useNavigate } from "react-router-dom";
import { addTelegramChannel } from "../../entities/user";

export const useAddTelegram = () => {
  const navigate = useNavigate();

  const addTelegram = async (id: string) => {
    try {
      const result = await addTelegramChannel(id);
      if (result.success) {
        // Если сервер вернул положительный ответ
        navigate("/myNotif");
      }
    } catch (error) {
      console.error("Ошибка при добавлении канала:", error);
    }
  };

  return { addTelegram };
};