import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../../shared/ui";
import { RolesDict, Roles } from "../../../shared/types";
import { useAuthStore } from "../model/store";

export const Callback: React.FC = () => {
  const { role, setRole } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoleSaved, setIsRoleSaved] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const baseUrl = "https://ddt.donstu.ru/notif";
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      axios
        .post(`${baseUrl}/api/auth/oauth/token`, { code, state })
        .then((response) => {
          const { access_token, role } = response.data;

          if (Object.values(RolesDict).includes(role)) {
            localStorage.setItem("authToken", access_token); // сохраняем токен
            setRole(role as Roles);
            setIsRoleSaved(true);
          } else {
            console.error("Неверная роль, полученная с сервера:", role);
          }
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    } else {
      setLoading(false);
    }
  }, [location, setRole]);

  useEffect(() => {
    if (isRoleSaved) {
      navigate(role === RolesDict.USER ? "/myPulse" : "/addPulse");
    }
  }, [isRoleSaved, role, navigate]);

  if (loading) {
    return <Loader message={"Авторизация"} />;
  }

  return null;
};
