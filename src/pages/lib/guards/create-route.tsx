import { FC } from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '../../../shared/types'; // Убедитесь, что путь корректен
import { PrivateRoute } from './private-route'; // Проверьте путь

export const CreateRoute: FC<IRoute> = ({ component, path, id, roles, ...route }) => {
  return (
    <Route
      path={path}
      key={id}
      element={
        <PrivateRoute
          roles={roles} // Передаем роли для маршрута
          element={component} // Передаем компонент для рендера
        />
      }
      {...route} // Дополнительные параметры маршрута (например, `isPublic`)
    />
  );
};
