import { Routes, RolesDict } from "../../shared/types";

export interface INav {
  id: number;
  path: string;
  label: string;
  allowedRoles: string[];
  onClick?: () => void;
}

export const NavItems: INav[] = [
  {
    id: 0,
    path: Routes.ADDPULSE,
    label: "Создание",
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
    ],
  },
  {
    id: 1,
    path: Routes.MYPULSE,
    label: "Профиль",
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
  },
  {
    id: 2,
    path: Routes.AUTH,
    label: "Выйти",
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
    onClick: () => {},
  },
];
