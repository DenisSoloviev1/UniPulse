import React, { LazyExoticComponent } from "react";

type NavItem = {
  [key: string]: string;
};

export const NavItem: NavItem = {
  "/": "Выйти",
  "/addNotif": "Создание",
  "/myNotif": "Профиль",
};

type ValueOf<T> = T[keyof T];

export enum Routes {
  AUTH = "/",
  NOTFOUND = "*",
  ADDNOTIF = "/addNotif",
  MYNOTIF = "/myNotif",
}

// roles

export const RolesDict = {
  ADMIN: "admin",
  MEDIA: "media",
  EDITOR: "editor",
  PUBLISHER: "publisher",
  USER: "user",
} as const;

export type Roles = ValueOf<typeof RolesDict>;

// router types

export interface IPrivateRoute {
  id: number;
  path: string;
  isPublic: boolean;
  component: LazyExoticComponent<React.FC<any>>;
  roles: Roles[];
}
