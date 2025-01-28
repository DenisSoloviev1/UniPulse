import { useEffect, useState } from "react";
import { getSubscriptions, useSubscriptionStore } from "../../entities/subscription";

export const useFetchSubscriptions = () => {
    const { setSubscriptions } = useSubscriptionStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      const fetchSubscriptions = async () => {
        try {
            setIsLoading(true)
            const responseData = await getSubscriptions();
            setSubscriptions(responseData);
            console.log('Сабки прошли')
        } catch (error) {
            setIsError(true);
            console.error("Ошибка загрузки подписок:", error);
        }
        finally{
            setIsLoading(false)
        }
      };
  
      fetchSubscriptions();
    }, [setSubscriptions]);

    return { isLoading, isError }
  };