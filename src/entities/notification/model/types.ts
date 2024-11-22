import { ITag } from "../../tag";

export interface INotif {
  id: number;
  title: string;
  description: string;
  //   tags: number[];//с бека приходит массив id тегов, нужно редактировать потом
  tags: ITag[];
}
