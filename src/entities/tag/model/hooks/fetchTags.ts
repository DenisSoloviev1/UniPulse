import { useEffect } from "react";
import { getTags } from "../../api";
import { useTagStore } from "..";

export const useFetchTags = () => {
  const { setFetchTags } = useTagStore();
  const token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    if (!token) return;

    const fetchTags = async () => {
      try {
        const responseData = await getTags(token);
        setFetchTags(responseData);
        console.log("Загруженные теги:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки тегов:", error);
      }
    };

    fetchTags();
  }, [token, setFetchTags]);

  return null;
};
