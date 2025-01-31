import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../../shared/ui";
import { RolesDict, Roles } from "../../../shared/types";
import { useAuthStore } from "../model/store";
import { baseUrl } from "../../../shared/config";
import { Routes } from "../../../shared/types";
import { IUser } from "../../user";

export const Callback: React.FC = () => {
  const { role, setRole, user, setUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRoleSaved, setIsRoleSaved] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      axios
        .post(`${baseUrl}/api/auth/oauth/token`, { code, state })
        .then((response) => {
          const { access_token, role } = response.data;

          if (Object.values(RolesDict).includes(role)) {
            localStorage.setItem("authToken", access_token);
            setRole(role as Roles);
            setUser(user as IUser);
            setIsRoleSaved(true);
          } else {
            console.error("Неверная роль, полученная с сервера:", role);
          }
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    } else {
      setIsLoading(false);
    }
  }, [location, setRole, setUser]);

  useEffect(() => {
    if (isRoleSaved) {
      navigate(Routes.MYNOTIF);
    }
  }, [isRoleSaved, role, navigate]);

  if (isLoading) {
    return <Loader size={"200px"} color={"blue"} />;
  }

  return null;
};
