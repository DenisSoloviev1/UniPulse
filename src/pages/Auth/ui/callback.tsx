import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../model/store";
import {Loader} from "../../../components"

export const Callback: React.FC = () => {
  const { role } = useAuthStore();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const baseUrl = "https://ddt.donstu.ru/notif";
    const code = query.get("code");
    const state = query.get("state");
    console.log(code);
    console.log(state);

    if (code) {
      // Отправляем код на сервер для обмена на access_token
      axios
        .post(`${baseUrl}/api/auth/oauth/token`, { code, state })
        .then((response) => {
          const { access_token } = response.data;
          // Сохраняем токен, например, в localStorage
          localStorage.setItem("authToken", access_token);
          // Перенаправляем пользователя в защищенную часть приложения
          //   role === "user"
          //     ? (window.location.href = `/${role}/myPulse`)
          //     : (window.location.href = `/${role}/addPulse`);
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        })
        .finally(() => {
          setLoading(false); // Отключаем загрузку после выполнения запроса
        });
    } else {
      setLoading(false); // Если нет кода, отключаем загрузку
    }
  }, [location]);

  if (loading) {
    return <Loader />;
  }
};
