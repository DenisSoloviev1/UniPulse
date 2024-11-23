import { ReactNode } from "react";
import { Routes, RolesDict } from "../../shared/types";
import { CreateSvg, ProfileSvg, ExitSvg } from "../../shared/ui/Icon";

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
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
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
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
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
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
    onClick: () => {},
  },
];
