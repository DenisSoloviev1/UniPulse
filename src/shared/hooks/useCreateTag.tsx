import { useState } from "react";
import { addTag } from "../../entities/tag";

export const useCreateTag = (tagDescription: string, tagName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTag = async () => {
    try {
      setIsLoading(true);
      if (tagName.length === 0 || tagDescription.length === 0) {
        setError("Заполните все поля");
        return;
      }
      await addTag(tagName, tagDescription);

      // Очистка формы и показ успеха
      setIsSuccess(true);
      setError("");

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Ошибка создания тега:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateTag, isSuccess, isLoading, error };
};
