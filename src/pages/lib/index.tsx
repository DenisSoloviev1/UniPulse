import React, { lazy } from "react";
import { IRoute, Roles, RolesDict } from "../../shared/types";

export enum Route {
  ADMIN = "/admin/*",
  MEDIA = "/media/*",
  EDITOR = "/editor/*",
  PUBLISHER = "/publisher/*",
  USER = "/user/*",
}

const withRole = (Component: React.FC<{ role: Roles }>, role: Roles) => {
  return (props: any) => <Component role={role} {...props} />;
};

export const routes: IRoute[] = [
  {
    id: 0,
    path: "/",
    component: lazy(() =>
      import("../Auth").then((module) => ({ default: module.Auth }))
    ),
    isPublic: true,
    roles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
  },
  {
    id: 1,
    path: "/callback",
    component: lazy(() =>
      import("../Auth/ui/callback").then((module) => ({ default: module.Callback }))
    ),
    isPublic: false,
    roles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
  },
  {
    id: 2,
    path: "*",
    component: lazy(() =>
      import("../NotFound").then((module) => ({ default: module.NotFound }))
    ),
    isPublic: true,
    roles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
      RolesDict.USER,
    ],
  },
  {
    id: 3,
    path: Route.ADMIN,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Admin, RolesDict.ADMIN) }))
    ),
    isPublic: false,
    roles: [RolesDict.ADMIN],
  },
  {
    id: 4,
    path: Route.MEDIA,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Media, RolesDict.MEDIA) }))
    ),    isPublic: false,
    roles: [RolesDict.MEDIA],
  },
  {
    id: 5,
    path: Route.EDITOR,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Editor, RolesDict.EDITOR) }))
    ),    isPublic: false,
    roles: [RolesDict.EDITOR],
  },
  {
    id: 6,
    path: Route.PUBLISHER,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Publisher, RolesDict.PUBLISHER) }))
    ),    isPublic: false,
    roles: [RolesDict.PUBLISHER],
  },
  {
    id: 7,
    path: Route.USER,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.User, RolesDict.USER) }))
    ),    isPublic: false,
    roles: [RolesDict.USER],
  },
];
