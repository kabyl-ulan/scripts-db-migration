export const ROLE_GROUPS = {
  admin: 1,
  ministry_employee: 2,
  university_admin: 3,
  university_employee: 4,
  abiturient: 5,
  university_representative: 6,
} as const;

export type RoleGroupName = keyof typeof ROLE_GROUPS;

export type IRoleTypeNumber = (typeof ROLE_GROUPS)[keyof typeof ROLE_GROUPS];
