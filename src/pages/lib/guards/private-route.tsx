import { ComponentType, FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth, NotFound } from "../../index";
import { useAuthStore } from "../../../entities/auth";
import { Roles, Routes } from "../../../shared/types";

interface IPrivateRoute {
  element: ComponentType;
  roles: Roles[];
  isPublic: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,
  roles,
  isPublic,
}) => {
  const { isAuth, role } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();

  // Логика перенаправления для авторизованных пользователей на главную
  useEffect(() => {
    if (isAuth && location.pathname === Routes.AUTH) {
      console.log("Redirecting from AUTH to MYNOTIF...");
      navigate(Routes.MYNOTIF, { replace: true }); // Используем replace, чтобы не добавлять переход в историю
    }
  }, [isAuth, location.pathname, navigate]);

  // Если страница публичная, рендерим её без проверок
  if (isPublic) {
    return <RouteComponent />;
  }

  // Если пользователь не авторизован, перенаправляем его на страницу авторизации
  if (!isAuth) {
    return <Auth />;
  }

  // Если пользователь авторизован, но его роль не соответствует разрешённым ролям, показываем страницу "Not Found"
  if (role && !roles.includes(role as Roles)) {
    return <NotFound />;
  }

  // Если пользователь авторизован и его роль совпадает с одной из разрешенных, рендерим компонент страницы
  return <RouteComponent />;
};
