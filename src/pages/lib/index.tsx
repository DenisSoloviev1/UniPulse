import React, { lazy } from "react";
import { IRoute, Roles, RolesDict, Routes } from "../../shared/types";

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
    path: Routes.ADMIN,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Admin, RolesDict.ADMIN) }))
    ),
    isPublic: false,
    roles: [RolesDict.ADMIN],
  },
  {
    id: 4,
    path: Routes.MEDIA,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Media, RolesDict.MEDIA) }))
    ),    isPublic: false,
    roles: [RolesDict.MEDIA],
  },
  {
    id: 5,
    path: Routes.EDITOR,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Editor, RolesDict.EDITOR) }))
    ),    isPublic: false,
    roles: [RolesDict.EDITOR],
  },
  {
    id: 6,
    path: Routes.PUBLISHER,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.Publisher, RolesDict.PUBLISHER) }))
    ),    isPublic: false,
    roles: [RolesDict.PUBLISHER],
  },
  {
    id: 7,
    path: Routes.USER,
    component: lazy(() =>
      import("../../app/roles").then((module) => ({ default: withRole(module.User, RolesDict.USER) }))
    ),    isPublic: false,
    roles: [RolesDict.USER],
  },
];
