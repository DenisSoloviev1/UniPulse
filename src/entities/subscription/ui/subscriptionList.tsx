import React from "react";
import { Flex, Loader } from "../../../shared/ui";
import { useSubscriptionStore, Subscription } from "../../subscription";

export const SubscriptionList: React.FC = () => {
  const { subscriptions } = useSubscriptionStore();

  return (
    <article>
      <Flex $direction={"row"} $wrap={true} $align={"center"}>
        {subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <Subscription
              key={subscription.id}
              id={subscription.id}
              tag_id={subscription.tag_id}
              tag={subscription.tag} 
              user_id={subscription.user_id}
              subscriptable={subscription.subscriptable}
            />
          ))
        ) : (
          <Loader $size={"50px"}/>
        )}
      </Flex>
    </article>
  );
};
