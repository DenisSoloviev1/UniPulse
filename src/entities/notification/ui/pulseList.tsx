import React, { useEffect, useState } from "react";
// import { getPuls } from "../api";
import { Flex, PlainTitle } from "../../../shared/ui";
import Pulse from "./pulse";
import { arrayPulse } from "../../../shared/date";

export const PulseList: React.FC<{ title: string }> = ({ title }) => {
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getPuls();
  //       setData(result); // Сохранение данных в состоянии
  //     } catch (error) {
  //       console.error("Ошибка при получении данных:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <article style={{ width: "100%" }}>
      <Flex>
        <PlainTitle>{title}</PlainTitle>
        {arrayPulse.map((pulseItem) => (
          <Pulse
            key={pulseItem.id}
            title={pulseItem.title}
            text={pulseItem.text}
            id={pulseItem.id}
            tags={pulseItem.tags}
          />
        ))}
      </Flex>
    </article>
  );
};
