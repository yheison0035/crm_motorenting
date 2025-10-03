export const Roles = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  COORDINADOR: 'COORDINADOR',
  ASESOR: 'ASESOR',
};

export const Permissions = {
  // Asesores
  ADVISORS_VIEW: [Roles.SUPER_ADMIN, Roles.ADMIN],
  ADVISORS_CREATE: [Roles.SUPER_ADMIN, Roles.ADMIN],
  ADVISORS_EDIT: [Roles.SUPER_ADMIN, Roles.ADMIN],
  ADVISORS_DELETE: [Roles.SUPER_ADMIN],

  // Clientes
  CUSTOMERS_VIEW: [
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
    Roles.COORDINADOR,
    Roles.ASESOR,
  ],
  CUSTOMERS_CREATE: [
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
    Roles.COORDINADOR,
    Roles.ASESOR,
  ],
  CUSTOMERS_IMPORT: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR],
  CUSTOMERS_ASSIGN: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.COORDINADOR],
  CUSTOMERS_DELETE: [Roles.SUPER_ADMIN], // solo superadmin elimina
  CUSTOMERS_EXPORT: [Roles.SUPER_ADMIN], // solo superadmin exporta
};
