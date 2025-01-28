import { useEffect, useState } from "react";
import { useAuthStore } from "../../entities/auth";
import { getRole } from "../../entities/user";

export const useFetchRole = () => {
  const { setRole, resetAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoading(true);
        const role = await getRole();
        setRole(role);
      } catch (error) {
        setIsError(true);
        console.error("Ошибка получения роли:", error);
        resetAuth();
      } finally {
        setIsLoading(false);
      }
    };
    fetchRole();
  }, [resetAuth, setRole]);

  return { isLoading, isError };
};