import React, { LazyExoticComponent } from "react";

type NavItem = {
  [key: string]: string;
};

export const NavItem: NavItem = {
"/employee": "Работник",
"/student": "Студент",
"/applicant": "Соискатель",
};

type ValueOf<T> = T[keyof T];


export enum Routes {
  ADMIN = "/admin/*",
  MEDIA = "/media/*",
  EDITOR = "/editor/*",
  PUBLISHER = "/publisher/*",
  USER = "/user/*",
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

export interface IRoute {
  id: number;
  path: string;
  isPublic: boolean;
  component: LazyExoticComponent<React.FC<any>>; 
  roles: Roles[];
}
