import { ComponentType, FC } from "react";
import { Auth, NotFound } from "../../index";
import { useAuthStore } from "../../../entities/auth";
import { Roles } from "../../../shared/types";

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
  // const { isAuth, role } = useAuthStore((state) => state);

  // Если страница публичная, рендерим её без проверок
  if (isPublic) {
    return <RouteComponent />;
  }

  // // Если пользователь не авторизован, перенаправляем его на страницу авторизации
  // if (!isAuth) {
  //   return <Auth />;
  // }

  // // Если пользователь авторизован, но его роль не соответствует разрешённым ролям, показываем страницу "Not Found"
  // if (role && !roles.includes(role as Roles)) {
  //   return <NotFound />;
  // }

  // Если пользователь авторизован и его роль совпадает с одной из разрешенных, рендерим компонент страницы
  return <RouteComponent />;
};
