import { IFile } from "../../../shared/types";
import { ITag } from "../../tag";

export interface INotif {
  id: number;
  title: string;
  description: string;
  status: "wait_submit" | "wait_sent" | "sent";
  time: number | null;
  files: IFile[] | null;
  tags: ITag[];
  creator: string;
}

type StatusNotif = {
  [key: string]: string;
}; // лучше используй утили тайпсы тут record можно

export const StatusNotif: StatusNotif = {
  "wait_submit": "обработка",
  "wait_sent": "ожидание",
  "sent": "отправлено",
};