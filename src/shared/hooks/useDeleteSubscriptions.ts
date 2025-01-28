import { deleteSubscriptions, useSubscriptionStore } from "../../entities/subscription";

export const useDeleteSubscription = (id: number) => {
  const { subscriptions, setSubscriptions } = useSubscriptionStore();

  const handleDeleteSubscription = async () => {
    try {
      await deleteSubscriptions(id);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении подписки:", error);
    }
  };

  return { handleDeleteSubscription };
};