import { useEffect, useState } from "react";
import { useAuthStore } from "../../entities/auth";
import { getRole } from "../../entities/user";

export const useFetchRole = () => {
  const { setRole, setAuthStatus, resetAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getRole();
        setRole(role);
        setAuthStatus(true);
      } catch (error) {
        setIsError(true);
        console.error("Ошибка получения роли:", error);
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    };
    fetchRole();
  }, [resetAuth, setAuthStatus, setRole]);

  return { isLoading, isError };
};