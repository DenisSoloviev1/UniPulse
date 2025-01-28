import { useState } from "react";
import { useTagStore } from "../../entities/tag";
import { subscribeToTag } from "../../entities/subscription";

export const useSubscribeToTag = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { selectedTags, setSelectedTags } = useTagStore();

  const handleSubscriptionTag = async () => {
    setIsLoading(true);

    if (selectedTags.length === 0) {
      setError("Не выбран ни один тег");
      setIsLoading(false);
      return;
    }

    try {
      // Подписываемся на все выбранные теги
      await Promise.all(
        selectedTags.map(async (tag) => {
          if (tag.id) {
            await subscribeToTag(tag.id);
          }
        })
      );

      // Очистка формы и показ успеха
      setSelectedTags([]);
      setIsSuccess(true);

      setTimeout(() => {
        // closeModal("SubscribeTag");
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Ошибка подписки на тег:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubscriptionTag, error, isLoading, isSuccess };
};