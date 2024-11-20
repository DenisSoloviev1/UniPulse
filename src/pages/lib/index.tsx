import { lazy } from "react";
import { IPrivateRoute, RolesDict } from "../../shared/types";

export const privateRoutes: IPrivateRoute[] = [

  {
    id: 0,
    path: "/callback",
    component: lazy(() =>
      import("../../entities/auth/api/callback").then((module) => ({
        default: module.Callback,
      }))
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
    path: "/addNotif",
    component: lazy(() =>
      import("../AddNotif").then((module) => ({ default: module.AddNotif }))
    ),
    isPublic: false,
    roles: [
      RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.EDITOR,
      RolesDict.PUBLISHER,
    ],
  },
  {
    id: 2,
    path: "/myNotif",
    component: lazy(() =>
      import("../MyNotif").then((module) => ({ default: module.MyNotif }))
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
];
