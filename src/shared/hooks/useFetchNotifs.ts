import { useEffect, useState } from "react";
import { getNotifs, INotif } from "../../entities/notification";
import { Roles } from "../types";

export const useFetchNotifs = (Roles: Roles) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<INotif[]>([]); 
  
    useEffect(() => {
      const fetchNotifs = async () => {
        try {
          setIsLoading(true);
          const responseData = await getNotifs(Roles);
          setData(responseData);
        } catch (error) {
          console.error("Ошибка загрузки уведомлений:", error);
        }
        finally {
          setIsLoading(false)
        }
      };
      fetchNotifs();
    }, [Roles]);
  
    return {data, isLoading };
  };