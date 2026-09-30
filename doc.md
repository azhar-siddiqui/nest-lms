const OPTION_1 = [
{
resource: 'settings',
actions: { create: true, read: false, update: true, delete: false },
},
{
resource: 'dashboard',
actions: { create: true, read: true, update: true, delete: true },
},
];

/// OPTION : 2 // OPTIMISE AND SCHELLABLE WAY
const OPTION_2 = [
{ resource: 'settings', actions: ['create', 'read', 'update', 'delete'] },
];

export enum Action {
CREATE = 'create',
READ = 'read',
UPDATE = 'update',
DELETE = 'delete',
MANAGE = 'manage', // All actions
}

export enum Resource {
ATTENDANCE = 'attendance',
GRADES = 'grades',
FEES = 'fees',
USERS = 'users',
}
