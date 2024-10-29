import { lazy } from "react";
import { IPrivateRoute, RolesDict } from "../../shared/types";

export const privateRoutes: IPrivateRoute[] = [

  {
    id: 0,
    path: "/callback",
    component: lazy(() =>
      import("../Auth/ui/callback").then((module) => ({
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
    path: "/addPulse",
    component: lazy(() =>
      import("../AddPulse").then((module) => ({ default: module.AddPulse }))
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
    path: "/myPulse",
    component: lazy(() =>
      import("../MyPulse").then((module) => ({ default: module.MyPulse }))
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
