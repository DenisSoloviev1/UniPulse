type ValueOf<T> = T[keyof T];

// roles

export const RolesDict = {
  ADMIN: 'admin',
  MEDIA: 'media',
  EDITOR: 'editor',
  PUBLISHER: 'publisher',
  USER: 'user',
} as const;

export type Roles = ValueOf<typeof RolesDict>;