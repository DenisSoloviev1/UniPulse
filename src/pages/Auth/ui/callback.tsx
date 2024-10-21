import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ModalWindow } from "../../../components";
import { Cat } from "../../../assets/svg";

export const Callback: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      // Отправляем код на сервер для обмена на access_token
      axios
        .post("/api/auth/oauth/token", { code, state })
        .then((response) => {
          const { access_token } = response.data;
          // Сохраняем токен, например, в localStorage
          localStorage.setItem("authToken", access_token);
          // Перенаправляем пользователя в защищенную часть приложения
          window.location.href = "/admin";
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    }
  }, [location]);

  return (
    <ModalWindow>
      <Cat />
    </ModalWindow>
  );
};
