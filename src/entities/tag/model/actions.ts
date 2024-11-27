import { useEffect } from "react";
import { ITag } from "../model";
import {
  deleteSubscriptions,
  ISubscription,
  useSubscriptionStore,
} from "../../subscription";

export const toggleTagSelect = (
  id: ITag["id"],
  initialTags: ITag[],
  selectedTags: ITag[],
  setSelectedTags: (tags: ITag[]) => void
) => {
  const tag = initialTags.find((tag) => tag.id === id);
  if (!tag) return;

  const updatedTags = selectedTags.some((selectedTag) => selectedTag.id === id)
    ? selectedTags.filter((selectedTag) => selectedTag.id !== id) // Удаляем тег, если он уже выбран
    : [...selectedTags, tag]; // Добавляем тег, если он ещё не выбран

  setSelectedTags(updatedTags);
};

export const handleDeleteSubscription = async (
    id: ISubscription["id"],
    subscriptions: ISubscription["tag"][],
    setSubscriptions: (subscriptions: ISubscription["tag"][]) => void
  ) => {
    try {
      // Выполняем запрос на удаление
      await deleteSubscriptions(id);
  
      // Обновляем локальное состояние, удаляя отписанный ID
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении подписки:", error);
    }
  };
  