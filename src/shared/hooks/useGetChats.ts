import { useEffect, useState } from "react";
import { getChats } from "../../entities/admin/api";
import { IChat } from "../../entities/admin/model";


export const useGetChats = () => {
    const [data, setData] = useState<IChat[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);
  
    useEffect(() => {
      const fetch = async () => {
        try {
          setIsloading(true);
          const result =  await getChats();
          setData(result);
        } catch (e) {
          console.error(e);
          setIsError(true);
        } finally {
          setIsloading(false);
        }
      };
  
      fetch();
    }, []);
  
    return { data, isError, isLoading };
  };
  