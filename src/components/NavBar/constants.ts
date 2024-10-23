import { Routes } from '../../shared/types';

export interface NavBar {
  id: number;
  path: string;
  label: string;
  allowedRoles: string[]; 
}

export const menuItems: NavBar[] = [
  {
    id: 1,
    path: Routes.ADMIN,
    label: 'Admin',
    allowedRoles: ['ADMIN']
  },
  {
    id: 2,
    path: Routes.MEDIA,
    label: 'Media',
    allowedRoles: ['MEDIA'] 
  },
  {
    id: 3,
    path: Routes.EDITOR,
    label: 'Editor',
    allowedRoles: ['EDITOR']
  },
  {
    id: 4,
    path: Routes.PUBLISHER,
    label: 'Publisher',
    allowedRoles: ['PUBLISHER']
  },
  {
    id: 5,
    path: Routes.USER,
    label: 'User',
    allowedRoles: ['USER']
  },
];
