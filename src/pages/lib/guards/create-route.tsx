import { FC } from "react";
import { Route } from "react-router-dom";
import { IPrivateRoute } from "../../../shared/types"; // Убедитесь, что путь корректен
import { PrivateRoute } from "./private-route"; // Проверьте путь

export const CreateRoute: FC<IPrivateRoute> = ({
  component,
  path,
  id,
  roles,
  ...route
}) => {
  return (
    <Route
      path={path}
      key={id}
      element={
        <PrivateRoute
          isPublic={route.isPublic}
          roles={roles} // Передаем роли для маршрута
          element={component} // Передаем компонент для рендера
        />
      }
      {...route}
    />
  );
};
