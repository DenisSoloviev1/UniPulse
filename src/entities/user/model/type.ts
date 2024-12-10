import { Roles } from "../../../shared/types";

export interface IUser {
  uuid: string;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string | null;
  channels: {
    telegram: string | null;
    vk: string | null;
  };
  eduCode: number;
  role: Roles;
  token: string;
  director: boolean;
  divisionID: number | null;
  divisionName: string | null;
  facultyID: number;
  facultyName: string | null;
  groupID: number | null;
  groupName: string | null;
  position: null;
  createdAt: string;
  updatedAt: string;
}
