import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles.scss";
import { Auth, Callback, NotFound, useAuthStore } from "../pages";
import { Admin, Media, Editor, Publisher, User } from "./roles";

const App: React.FC = () => {
  // Вместо авторизации используем константу для тестирования
  const { role, setRole } = useAuthStore();

  // const userRole = use

  return (
    <BrowserRouter>
      <Routes>
        {/* Если роль не определена, показываем страницу авторизации */}
        <Route path="/" element={<Auth />} />
        {!role ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <>
            {/* Определяем маршруты для каждой роли */}
            {role === "admin" && (
              <Route path="/admin/*" element={<Admin role={role} />} />
            )}
            {role === "media" && (
              <Route path="/media/*" element={<Media role={role} />} />
            )}
            {role === "editor" && (
              <Route path="/editor/*" element={<Editor role={role} />} />
            )}
            {role === "publisher" && (
              <Route
                path="/publisher/*"
                element={<Publisher role={role} />}
              />
            )}
            {role === "user" && (
              <Route path="/user/*" element={<User role={role} />} />
            )}
            {/* Перенаправляем на соответствующий маршрут */}
            {/* <Route path="/" element={<Navigate to={`/${userRole}`} />} /> */}
            <Route path="/callback" element={<Callback  />} />
          </>
        )}
        {/* Страница не найдена */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
