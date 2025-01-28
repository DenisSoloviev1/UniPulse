import React from "react";
import { Time, INotif } from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate, isMobile } from "../../../shared/config";
import { Flex, ShowFile } from "../../../shared/ui";
import { TextMore, Title } from "../style";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

const CarouselItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
`;

const hrefSearch = (text: string) => {
  const hrefMatch = text.match(/<a[^>]+href='([^']+)'/);
  if (hrefMatch?.[1]) {
    return hrefMatch[1];
  }
  return "";
};

const descriptionToArr = (text: string) =>
  text.replace(/<a[^>]*>.*?<\/a>/g, "").split("\n");

export const MoreInfo: React.FC<INotif> = ({
  media,
  description,
  id,
  tags,
  title,
  files,
  time,
}) => {
  const formattedDate = formatDate(time);

  const descriptionArr = descriptionToArr(description);

  const hrefValue = hrefSearch(description);

  return (
    <Flex $width={"100%"} $gap={15}>
      <Flex
        $width={"100%"}
        $direction={isMobile ? "column" : "row-reverse"}
        $align={"end"}
        $justify={"space-between"}
      >
        <Time>{formattedDate}</Time>
      </Flex>

      <Title>{title}</Title>

      <TextMore>
        {descriptionArr.map((el, i) => (
          <TextMore key={el + "_" + i}>{el}</TextMore>
        ))}

        <Carousel
          autoPlay={true}
          stopAutoPlayOnHover={true}
          interval={4000}
          animation="slide"
          duration={300}
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
          {media.map((el) => (
            <CarouselItemWrapper>
              <img key={el} height={300} src={el} />
            </CarouselItemWrapper>
          ))}
        </Carousel>
        <TextMore>
          <a href={hrefValue}>Читать полностью</a>
        </TextMore>
      </TextMore>

      {files && <ShowFile files={files} idNotif={id} />}

      <Flex $direction={"row"} $align={"center"} $wrap>
        {tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} style={"noAction"} />
        ))}
      </Flex>
    </Flex>
  );
};
