export interface ITag {
  id: number;
  name: string;
  description: string;
  subscriptable: boolean;
}

export interface ISubscription {
  id: number;
  tag_id: number;
  subscriptable: boolean;
  tag: ITag;
}
