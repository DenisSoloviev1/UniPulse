import React, { useEffect, useState } from "react";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { Loader } from "../../shared/ui";

export const AddChannel: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, setUserId } = useAuthStore();

  const [channelId, setChannelId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем текущий URL
    const url = new URL(window.location.href);
    // Извлекаем параметр id
    const id = url.searchParams.get("id");
    setChannelId(id);

    console.log("isAuth", isAuth);

    if (!isAuth) {
      if (id != null) {
        setUserId(id);
      }
      navigate("/");
    } else {
      void addTelegram();
    }

    async function addTelegram() {
      try {
        const result = await addTelegramChannel(id);

        console.log("Успех:", result);
        if (result.success) {
          // Если сервер вернул положительный ответ
          navigate("/myNotif");
        }
      } catch (error) {
        console.error("Ошибка при добавлении канала:", error);
      }
    }
  }, []);

  return <Loader $size={"200px"} />;
};
