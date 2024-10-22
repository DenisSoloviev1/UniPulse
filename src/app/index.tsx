import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.scss";
import { useAuthStore, Auth, Callback } from "../pages/Auth";
import { NotFound } from "../pages/NotFound";
import { Admin, Media, Editor, Publisher, User } from "./roles";
import { Routing } from "../pages/lib/guards";

const App: React.FC = () => {
  // Вместо авторизации используем константу для тестирования
  const { role } = useAuthStore();
  console.log(role);

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default App;

// <Routes>
//       <Route path="/" element={<Auth />} />
//       {!role ? (
//         <Route path="/" element={<Auth />} />
//       ) : (
//         <>
//           {/* Определяем маршруты для каждой роли */}
//           {role === "admin" && (
//             <Route path="/admin/*" element={<Admin role={role} />} />
//           )}
//           {role === "media" && (
//             <Route path="/media/*" element={<Media role={role} />} />
//           )}
//           {role === "editor" && (
//             <Route path="/editor/*" element={<Editor role={role} />} />
//           )}
//           {role === "publisher" && (
//             <Route
//               path="/publisher/*"
//               element={<Publisher role={role} />}
//             />
//           )}
//           {role === "user" && (
//             <Route path="/user/*" element={<User role={role} />} />
//           )}
//           {/* Перенаправляем на соответствующий маршрут */}
//           {/* <Route path="/" element={<Navigate to={`/${userRole}`} />} /> */}
//           <Route path="/callback" element={<Callback  />} />
//         </>
//       )}
//       {/* Страница не найдена */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
