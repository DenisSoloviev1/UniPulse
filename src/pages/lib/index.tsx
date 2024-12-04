import { lazy } from "react";
import { IPrivateRoute, RolesDict, Routes } from "../../shared/types";

export const privateRoutes: IPrivateRoute[] = [
  {
    id: 0,
    path: Routes.CALLBACK,
    component: lazy(() =>
      import("../../entities/auth/api/callback").then((module) => ({
        default: module.Callback,
      }))
    ),
    isPublic: true,
    roles: [
      // RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      RolesDict.USER,
    ],
  },
  {
    id: 1,
    path: Routes.ADDNOTIF,
    component: lazy(() =>
      import("../AddNotif").then((module) => ({ default: module.AddNotif }))
    ),
    isPublic: false,
    roles: [
      // RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
    ],
  },
  {
    id: 2,
    path: Routes.MYNOTIF,
    component: lazy(() =>
      import("../MyNotif").then((module) => ({ default: module.MyNotif }))
    ),
    isPublic: false,
    roles: [
      // RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      RolesDict.USER,
    ],
  },
  {
    id: 3,
    path: Routes.ADDCHANNEL,
    component: lazy(() =>
        import("../AddChannel").then((module) => ({ default: module.AddChannel }))
    ),
    isPublic: true,
    roles: [
      // RolesDict.ADMIN,
      RolesDict.MEDIA,
      RolesDict.CREATOR,
      RolesDict.USER,
    ],
  },
];
