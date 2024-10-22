import { ComponentType, FC } from "react";
import { Auth, useAuthStore, NotFound } from "../../index"; // Предположим, NotFound и Auth экспортируются из одного файла
import { Roles } from "../../../shared/types"; // Импорт типов ролей

interface IPrivateRoute {
  element: ComponentType;  // Компонент страницы, который должен быть отрендерен
  roles: Roles[];  // Массив ролей, которым доступна эта страница
}

export const PrivateRoute: FC<IPrivateRoute> = ({
  element: RouteComponent,  // Компонент, который нужно отрендерить при успешной авторизации и наличии роли
  roles,
}) => {
  const { isAuth, role } = useAuthStore((state) => state); // Получаем информацию о том, авторизован ли пользователь и его роль

  // // Если пользователь не авторизован, перенаправляем его на страницу авторизации
  // if (!isAuth) {
  //   return <Auth />;
  // }

  // // Если пользователь авторизован, но его роль не соответствует разрешенным ролям, показываем страницу "Not Found"
  // if (!roles.includes(role as Roles)) {
  //   return <NotFound />;
  // }

  // Если пользователь авторизован и его роль совпадает с одной из разрешенных, рендерим компонент страницы
  return <RouteComponent />;
};
