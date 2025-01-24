import {
  Flex,
  CustomButton,
  PlainTitle,
  ModalWindow,
  Slider,
  Loader,
  Skeleton,
} from "../../../shared/ui";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { TagList } from "../../../entities/tag";
import { Cat, ComplitedSvg } from "../../../shared/ui/Icon";
import { useTagStore } from "../../../entities/tag";
import { Error } from "../../Notif/style";
// import { Modal } from "../../../shared/ui/ModalWindow/indexNew";
import { useSubscribeToTag } from "../../../shared/hooks/useSubscribeToTag";
import { useFetchSubscriptionToTags } from "../../../shared/hooks/useFetchSubscriptionToTags";

export const SubscribeTag = () => {
  const closeModal = useModalStore((state) => state.close);
  const isOpenSubscribeTag = useModalStore((state) =>
    state.isOpen("SubscribeTag")
  );

  const { isSuccess, error, handleSubscriptionTag, isLoading } =
    useSubscribeToTag();

  const { isLoading: isLoadingTags } = useFetchSubscriptionToTags();

  const { subscriptionToTags } = useTagStore();

  return (
    <ModalWindow
      show={isOpenSubscribeTag}
      onClick={() => closeModal("SubscribeTag")}
    >
      {isSuccess ? (
        <ComplitedSvg />
      ) : (
        <>
          <Flex $width={"100%"}>
            <PlainTitle>Доступные теги</PlainTitle>
            <Slider $height={100} $wrap={true}>
              {isLoadingTags ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <Skeleton key={index} $width="125px" />
                ))
              ) : (
                <TagList initialTags={subscriptionToTags} />
              )}
            </Slider>
          </Flex>

          <Cat />

          <Flex $align={"center"} $width={"100%"}>
            <CustomButton
              onClick={handleSubscriptionTag}
              $style={"blue"}
              $width={"70%"}
            >
              {isLoading ? <Loader size={"23px"} /> : "Подписаться"}
            </CustomButton>

            {error && <Error>{error}</Error>}
          </Flex>
        </>
      )}
    </ModalWindow>
  );
};
