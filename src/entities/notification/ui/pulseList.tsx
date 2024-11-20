import React from "react";
import { Flex, PlainTitle } from "../../../shared/ui";
import { Pulse } from "./pulse";
import { INotif } from "../model";

interface PulseListProps {
  title: string;
}

export const PulseList: React.FC<PulseListProps> = ({ title }) => {
  // Инициализируем массив пульсов с типом INotif[]
  const arrayPulse: INotif[] = [
    // Пример объекта, соответствующего INotif
    {
      id: 1,
      title: "Пример заголовка",
      text: "Пример текста",
      tags: [
        { id: 101, name: "Тег 1", description: "Описание тега 1", subscriptable: true },
        { id: 102, name: "Тег 2", description: "Описание тега 2", subscriptable: false },
      ],
    },
    // Можно добавить больше объектов
  ];//вместо этой хуйни будет полученный с бэка массив тегов, единственное там приходит массив id тегов, возможно сделаем массив тегов как объктов

  return (
    <article style={{ width: "100%" }}>
      <Flex $direction="column" $gap={20}>
        <PlainTitle>{title}</PlainTitle>
        {arrayPulse.length > 0 ? (
          arrayPulse.map((pulseItem) => (
            <Pulse
              key={pulseItem.id}
              title={pulseItem.title}
              text={pulseItem.text}
              id={pulseItem.id}
              tags={pulseItem.tags}
            />
          ))
        ) : (
          <p>Пусто</p>
        )}
      </Flex>
    </article>
  );
};
