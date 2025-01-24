import { useEffect, useState } from "react";
import { getNotifs, useNotifStore } from "../../entities/notification";
import { RolesDict } from "../types";

export const useFetchNotifs = () => {
    const [isLoading, setIsLoading] = useState(true);
  
    const { setNotifs } = useNotifStore();
  
    useEffect(() => {
      const fetchNotifs = async () => {
        try {
          const responseData = await getNotifs(RolesDict.CREATOR);
          setNotifs(responseData);
          setIsLoading(false);
          console.log("Загруженные уведомления:", responseData);
        } catch (error) {
          console.error("Ошибка загрузки уведомлений:", error);
        }
      };
      fetchNotifs();
    }, [setNotifs]);
  
    return { isLoading };
  };