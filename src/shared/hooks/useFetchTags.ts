import { useEffect, useState } from "react";
import { getTags, ITag, useTagStore } from "../../entities/tag";

export const useFetchTags = () => {
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [data, setData] = useState<ITag[]>([])
  const { setTags } = useTagStore();

  useEffect(() => {
    const fetchTags = async () => {
      setIsLoadingTags(true);
      try {
        const responseData = await getTags();
        setData(responseData)
        setTags(responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, [setTags]);

  return { isLoadingTags, data };
};