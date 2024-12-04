import { ITag } from "../../tag";

export interface INotif {
  id: number;
  title: string;
  description: string;
  status: "wait_submit" | "wait_sent" | "sent";
  time: number | null;
  files: any | null;
  tags: ITag[];
}

type StatusNotif = {
  [key: string]: string;
};

export const StatusNotif: StatusNotif = {
  "wait_submit": "обработка",
  "wait_sent": "ожидание",
  "sent": "отправлено",
};