import { useEffect, useState } from "react";
import { addTelegramChannel } from "../../entities/user";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../entities/auth";
import { Loader } from "../../shared/ui";
import { Routes } from "../../shared/types";

export const AddChannel = () => {
  const navigate = useNavigate();
  const { isAuth, setUserId } = useAuthStore();

  const [channelId, setChannelId] = useState<string>("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id") ?? "";
    // const location = useLocation(); есть такая запись
    setChannelId(id);

    if (!isAuth) {
      if (id != null) {
        setUserId(id);
        localStorage.setItem("tgId", id);
      }
      void addTelegram();
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
  }, [channelId, isAuth, navigate, setUserId]);

  return <Loader size={"200px"} color={"blue"} />;
};
