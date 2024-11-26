import { ITag } from "../../tag";

export interface ISubscription {
  id: number;
  user_id: string;
  tag_id: number;
  subscriptable: boolean;
  tag: ITag;
}
