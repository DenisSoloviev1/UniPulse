import { useEffect, useState } from "react";
import { getSubscriptionToTags, useTagStore } from "../../entities/tag";

export const useFetchSubscriptionToTags = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setSubscriptionToTags } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoading(true);
      try {
        const responseData = await getSubscriptionToTags();
        setSubscriptionToTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [setSubscriptionToTags]);

  return { isLoading };
};