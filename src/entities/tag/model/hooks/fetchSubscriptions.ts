import { useEffect } from "react";
import { getSubscriptions } from "../../api";
import { useTagStore } from "..";

export const useFetchSubscriptions = () => {
  const { setSubscriptionTags } = useTagStore();
  const token = localStorage.getItem("authToken") || "";

  useEffect(() => {
    if (!token) return;

    const fetchSubscriptions = async () => {
      try {
        const responseData = await getSubscriptions(token);
        setSubscriptionTags(responseData);
        console.log("Загруженные подписки:", responseData);
      } catch (error) {
        console.error("Ошибка загрузки подписок:", error);
      }
    };

    fetchSubscriptions();
  }, [token, setSubscriptionTags]);

  return null;
};
