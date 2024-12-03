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
              {...subscription}
            />
          ))
        ) : (
          <Loader size={"30px"} color={"blue"}/>
        )}
      </Flex>
    </article>
  );
};
