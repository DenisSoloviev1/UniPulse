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
  CALLBACK = "/callback",
  ADDNOTIF = "/addNotif",
  MYNOTIF = "/myNotif",
  ADDCHANNEL = "/addChannel/:platform",
  ADMIN = "/admin",
}

// roles
export const RolesDict = {
  ADMIN: "admin",
  MEDIA: "media",
  CREATOR: "creator",
  USER: "user",
} as const;

export type Roles = ValueOf<typeof RolesDict>;

// router types
export interface IPrivateRoute {
  id: number;
  path: string;
  isPublic: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<React.FC<any>>; 
  // по возможности не стоит использовать any никогда лучше используй unknown
  // но и то и то на моей практике используется когда не справились с ts
  roles: Roles[];
}

//file type
export interface IFile {
  fileName: string;
  fileSize: number;
  id: string;
  type: string;
  data: string;
}
