import React from "react";
import { Flex } from "../../components";
import Pulse from "../Pulse";
import { arrayPulse } from "../../assets/date";

interface PulseListProps {
  title: string;
}

const PulseList: React.FC<PulseListProps> = ({ title }) => {
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

export default PulseList;
