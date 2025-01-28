import { useEffect, useState } from "react";
import { getSubscriptionToTags, ITag, useTagStore } from "../../entities/tag";

export const useFetchSubscriptionToTags = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ITag[]>([]);

  const { setSubscriptionToTags } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const responseData = await getSubscriptionToTags();
        setSubscriptionToTags(responseData);
        setData(responseData)
        // console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, [setSubscriptionToTags]);

  return { isLoading, data };
};