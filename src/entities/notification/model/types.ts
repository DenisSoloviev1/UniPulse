import { ITag } from "../../tag";

export interface INotif {
  id: number;
  title: string;
  text: string;
  //   tags: number[];//с бека приходит массив id тегов, нужно редактировать потом
  tags: ITag[];
}
