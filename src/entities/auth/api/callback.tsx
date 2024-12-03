import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../../../shared/ui";
import { RolesDict, Roles } from "../../../shared/types";
import { useAuthStore } from "../model/store";
import { baseUrl } from "../../../shared/config";


export const Callback: React.FC = () => {
  const { role, setRole } = useAuthStore();
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
  }, [location, setRole]);

  useEffect(() => {
    if (isRoleSaved) {
      navigate(role === RolesDict.USER ? "/myNotif" : "/addNotif");
    }
  }, [isRoleSaved, role, navigate]);

  if (isLoading) {
    return <Loader $size={"200px"}/>;
  }

  return null;
};
