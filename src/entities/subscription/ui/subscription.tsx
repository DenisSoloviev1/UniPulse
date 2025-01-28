import React from "react";
import styled from "styled-components";
import { ISubscription } from "../";
import { Tag } from "../../tag";
import { Flex, CustomButton } from "../../../shared/ui";
import { useDeleteSubscription } from "../../../shared/hooks/useDeleteSubscriptions";
import { Modal } from "../../../shared/ui/ModalWindow/indexNew";
import { ModalContent } from "../../../shared/ui/ModalWindow/style";

const SubscriptionContainer = styled.div`
  position: relative;
`;

export const Subscription: React.FC<ISubscription> = ({
  id,
  tag_id,
  tag,
  subscriptable,
}) => {
  const { handleDeleteSubscription } = useDeleteSubscription(id);

  return (
    <SubscriptionContainer id={`${id}`}>
      <Modal
        renderProp={() => (
          <ModalContent>
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

                  <CustomButton $style={"blue"} $width={"50%"}>
                    Нет
                  </CustomButton>
                </Flex>
              </>
            ) : (
              <p>От тега нельзя отписаться</p>
            )}
          </ModalContent>
        )}
      >
        <Tag id={tag_id} name={tag.name} />
      </Modal>
    </SubscriptionContainer>
  );
};
