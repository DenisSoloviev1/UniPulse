import React from "react";
import Flex from "../components/Flex";
import Pulse from "./Pulse";
import { arrayPulse } from "../assets/date";

interface PulseListProps {
  title: string;
}

const PulseList: React.FC<PulseListProps> = ({ title }) => {
  return (
    <article>
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

export default PulseList;
