import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { Loader } from "../shared/ui";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "../pages/lib/guards";
import { useAuthStore } from "../entities/auth"; 
import { getRole } from "../entities/user"; 
import "./styles.scss";

const App: React.FC = () => {
  const { setRole, setAuthStatus, resetAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getRole();
        setRole(role);
        setAuthStatus(true);
      } catch (error) {
        console.error("Ошибка получения роли:", error);
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [setRole, setAuthStatus, resetAuth]);

  if (isLoading) {
    return <Loader size={"200px"} color={"blue"} />;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader size={"200px"} color={"blue"} />}>
        <Routing />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
