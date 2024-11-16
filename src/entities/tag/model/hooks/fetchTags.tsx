import { useEffect } from "react";
import { getTags } from "../../api";
import { useTagStore } from "../../model";

export const useFetchTags = () => {
  const { setFetchTags } = useTagStore();
  const token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags(token);
        setFetchTags(tagsData);
        console.log("Загруженные теги:", tagsData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      }
    };

    fetchTags();
  }, [token, setFetchTags]);

  return null;
};
