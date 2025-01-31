import { ReactNode } from "react";
import { Routes, RolesDict } from "../../shared/types";
import { CreateSvg, ProfileSvg, ExitSvg, AdminSvg } from "../../shared/ui/Icon";

export interface INav {
  id: number;
  path: string;
  label: string;
  svg: ReactNode;
  allowedRoles: string[];
  onClick?: () => void;
}

export const NavItems: INav[] = [
  {
    id: 0,
    path: Routes.ADDNOTIF,
    label: "Создание",
    svg: CreateSvg,
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      // RolesDict.MODERATOR,
    ],
  },
  {
    id: 1,
    path: Routes.MYNOTIF,
    label: "Профиль",
    svg: ProfileSvg,
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      // RolesDict.MODERATOR,
    ],
  },
  {
    id: 3,
    path: Routes.ADMIN,
    label: "Админка",
    svg: AdminSvg,
    allowedRoles: [
      RolesDict.ADMIN,
    ],
  },
  {
    id: 2,
    path: Routes.AUTH,
    label: "Выйти",
    svg: ExitSvg,
    allowedRoles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      // RolesDict.MODERATOR,
      RolesDict.USER,
    ],
    onClick: () => {},
  },
];
