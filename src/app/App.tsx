import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Auth from "../pages/Auth";
import NotFound from "../pages/NotFound";
import Admin from "./roles/Admin";
import Media from "./roles/Media";
import Editor from "./roles/Editor";
import Publisher from "./roles/Publisher";
import User from "./roles/User";

const App: React.FC = () => {
  // Вместо авторизации используем константу для тестирования
  const [userRole, setUserRole] = useState<string | null>("admin"); // Начальное состояние - нет роли

  // Функция для установки роли (например, после успешной авторизации)
  const handleLogin = (role: string) => {
    setUserRole(role); // Устанавливаем роль пользователя
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Если роль не определена, показываем страницу авторизации */}
        <Route path="/" element={<Auth />} />
        {!userRole ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <>
            {/* Определяем маршруты для каждой роли */}
            {userRole === "admin" && <Route path="/admin/*" element={<Admin role={userRole}/>} />}
            {userRole === "media" && <Route path="/media/*" element={<Media role={userRole}/>} />}
            {userRole === "editor" && <Route path="/editor/*" element={<Editor role={userRole}/>} />}
            {userRole === "publisher" && <Route path="/publisher/*" element={<Publisher role={userRole}/>} />}
            {userRole === "user" && <Route path="/user/*" element={<User role={userRole}/>} />}
            {/* Перенаправляем на соответствующий маршрут */}
            <Route path="/" element={<Navigate to={`/${userRole}`} />} />
          </>
        )}
        {/* Страница не найдена */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
