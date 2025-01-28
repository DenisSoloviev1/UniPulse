import { Flex, PlainTitle, Slider } from "../../../shared/ui";
import { EditNotif, MoreInfo, SubmitNotif } from "../../../widjets/Notif";
import { NotifProps } from "./notification";

export const SlidersFactory = (notifProp: NotifProps) => {
  return {
    USER: (
      <Slider $padding={5}>
        <MoreInfo {...notifProp} />
      </Slider>
    ),
    MEDIA: (
      <Slider $padding={5}>
        <SubmitNotif notifData={notifProp} />
      </Slider>
    ),
    CREATOR: (
      <Flex $gap={10} $width={"100%"} $height={"100%"}>
        <PlainTitle style={{ fontSize: "30px", fontWeight: "500" }}>
          Редактирование
        </PlainTitle>

        <Slider $padding={5}>
          <EditNotif notifData={notifProp} />
        </Slider>
      </Flex>
    ),
  };
};
