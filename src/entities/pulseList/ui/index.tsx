import React from "react";
import { Flex } from "../../../shared/ui";
import Pulse from "../../../widjets/Pulse";
import { arrayPulse } from "../../../assets/date";

interface PulseListProps {
  title: string;
}

export const PulseList: React.FC<PulseListProps> = ({ title }) => {
  return (
    <article style={{width: "100%"}}>
      <Flex title={title}>
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