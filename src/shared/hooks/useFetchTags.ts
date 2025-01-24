import { useEffect, useState } from "react";
import { getTags, useTagStore } from "../../entities/tag";

export const useFetchTags = () => {
  const [isLoadingTags, setIsLoadingTags] = useState(false);

  const { setTags } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getTags();
        setTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, [setTags]);

  return { isLoadingTags };
};