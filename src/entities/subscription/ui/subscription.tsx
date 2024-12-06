import React from "react";
import styled from "styled-components";
import { ISubscription, deleteSubscriptions, useSubscriptionStore } from "../";
import { Tag } from "../../tag";
import { Flex, CustomButton, ModalWindow } from "../../../shared/ui";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { isMobile } from "../../../shared/config";

const SubscriptionContainer = styled.div`
  position: relative;
`;

export const Subscription: React.FC<ISubscription> = ({
  id,
  tag_id,
  tag,
  subscriptable,
}) => {
  const { subscriptions, setSubscriptions } = useSubscriptionStore();

  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isOpenDeleteSubscription = useModalStore((state) =>
    state.isOpen(`DeleteSubscription-${id}`)
  );

  const handleDeleteSubscription = async () => {
    try {
      await deleteSubscriptions(id);
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении подписки:", error);
    }
    closeModal(`DeleteSubscription-${id}`); // Закрыть модалку после удаления
  };

  return (
    <SubscriptionContainer id={`${id}`}>
      <Tag
        id={tag_id}
        name={tag.name}
        onClick={() => openModal(`DeleteSubscription-${id}`)}
      />

      <ModalWindow
        onClick={() => closeModal(`DeleteSubscription-${id}`)}
        show={isOpenDeleteSubscription}
        position={isMobile ? undefined : ["", "", "20px", ""]}
        width={"250px"}
        height={"auto"}
      >
        {subscriptable ? (
          <>
            <p>
              Отписаться от тега: <strong>{tag.name}</strong>?
            </p>
            <Flex
              $direction={"row"}
              $align={"center"}
              $width={"100%"}
              $gap={10}
            >
              <CustomButton
                $style={"gray"}
                $width={"50%"}
                onClick={handleDeleteSubscription}
              >
                Да
              </CustomButton>

              <CustomButton
                $style={"blue"}
                $width={"50%"}
                onClick={() => closeModal(`DeleteSubscription-${id}`)}
              >
                Нет
              </CustomButton>
            </Flex>
          </>
        ) : (
          <p>От тега нельзя отписаться</p>
        )}
      </ModalWindow>
    </SubscriptionContainer>
  );
};
