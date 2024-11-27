export const formatDate = (input: number | string | null): string => {
  if (typeof input === "number") {
    const date = new Date(input * 1000);

    const dayMonthYear = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(" г.", ""); // Удаляем "г."

    const time = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);

    return `${dayMonthYear} ${time}`; // Объединяем дату и время
  } else {
    throw new Error("Неверный формат времени");
  }
};
