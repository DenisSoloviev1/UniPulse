import { useEffect } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import {
  Flex,
  CustomButton,
  PlainTitle,
  Skeleton,
  Slider,
  Loader,
} from "../../shared/ui";
import { NotifList } from "../../entities/notification";
import { SubscriptionList } from "../../entities/subscription";
import {
  Cat,
  ComplitedSvg,
  Plus,
  TelegramSvg,
  VKSvg,
} from "../../shared/ui/Icon";
import { useAuthStore } from "../../entities/auth";
import { RolesDict } from "../../shared/types";
import { useFetchNotifs } from "../../shared/hooks/useFetchNotifs";
import { useAddTelegram } from "../../shared/hooks/useAddTelegram";
import { useFetchSubscriptions } from "../../shared/hooks/useFetchSubscriptions";
import { Modal } from "../../shared/ui/ModalWindow/indexNew";
import { TagList } from "../../entities/tag";
import { Error } from "../../widjets/Notif/style";
import { useSubscribeToTag } from "../../shared/hooks/useSubscribeToTag";
import { useFetchSubscriptionToTags } from "../../shared/hooks/useFetchSubscriptionToTags";
import { ModalContent } from "../../shared/ui/ModalWindow/style";
import { SocialWeb } from "../style";

export const MyNotif = () => {
  const { userId, isAuth, user } = useAuthStore(); // Используем стор для получения userId

  //получение тегов, на которые подписан
  const { isLoading: isLoadingSubs } = useFetchSubscriptions();

  const { isLoading: isLoadingNotifs, data: subscriptionNotifs } =
    useFetchNotifs("user");

  const { isLoading: isLoadingTags, data: subscriptionToTags } =
    useFetchSubscriptionToTags();

  // Функция для выполнения запроса
  const { addTelegram } = useAddTelegram();

  const { isSuccess, error, handleSubscriptionTag } = useSubscribeToTag();

  // const { subscriptionToTags } = useTagStore();

  // Запрос на добавление канала, если userId в сторе присутствует
  useEffect(() => {
    if (isAuth && userId) {
      addTelegram(userId);
    }
  }, [addTelegram, isAuth, userId]); // не пон зачем это и что делает
  // мне кажется эта функция должна вызываться где-то выше

  const telegramLink = `https://t.me/unipulse_dstu_bot?start=${user.eduCode}`

  return (
    <>
      <Header />
      <Main>
        <Flex $gap={20}>
          <Flex $gap={10}>
            <PlainTitle>Бот для рассылки</PlainTitle>

            <Flex $direction={"row"} $gap={20}>
              <SocialWeb href={telegramLink} target="_blanck">
                <TelegramSvg />
              </SocialWeb>

              <SocialWeb href="/" target="_blanck">
                <VKSvg />
              </SocialWeb>
            </Flex>
          </Flex>

          <Flex $gap={10}>
            <PlainTitle>Мои подписки</PlainTitle>

            <Flex $direction={"row"} $align={"center"} $gap={10}>
              <SubscriptionList />

              <Modal
                renderProp={() =>
                  isSuccess ? (
                    <ComplitedSvg />
                  ) : (
                    <ModalContent>
                      <Flex $width={"100%"}>
                        <PlainTitle>Доступные теги</PlainTitle>
                        <Slider $wrap={true}>
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
                          {isLoadingNotifs ? (
                            <Loader size={"23px"} />
                          ) : (
                            "Подписаться"
                          )}
                        </CustomButton>

                        {error && <Error>{error}</Error>}
                      </Flex>
                    </ModalContent>
                  )
                }
              >
                <CustomButton type={"button"} $style={"blue"}>
                  <Plus />
                </CustomButton>
              </Modal>
            </Flex>
          </Flex>
        </Flex>

        <Flex $gap={10} $width={"100%"}>
          <PlainTitle>Полученные пульсы</PlainTitle>

          {isLoadingNotifs || isLoadingSubs ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} $height="150px" />
            ))
          ) : (
            <NotifList
              role={RolesDict.USER}
              initialNotifs={subscriptionNotifs}
            />
          )}
        </Flex>
      </Main>
    </>
  );
};
