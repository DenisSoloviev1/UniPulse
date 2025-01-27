import React, { useEffect } from "react";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { Loader } from "../../shared/ui";
import { Routes } from "../../shared/types";

export const AddChannel: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, setUserId } = useAuthStore();

  useEffect(() => {
    // Получаем текущий URL
    const url = new URL(window.location.href);
    // Извлекаем параметр id
    const id = url.searchParams.get("id");

    if (!isAuth) {
      if (id != null) {
        setUserId(id);
      }
      navigate(Routes.AUTH);
    } else {
      void addTelegram();
    }

    async function addTelegram() {
      try {
        const result = await addTelegramChannel(id);

        if (result.success) {
          // Если сервер вернул положительный ответ
          navigate(Routes.MYNOTIF);
        }
      } catch (error) {
        console.error("Ошибка при добавлении канала:", error);
      }
    }
  }, []);

  return <Loader size={"200px"} color={"blue"} />;
};
