import { UserRole } from './user-role.enum.js';

export interface User {
  _id: string;
  fName: string;
  lName: string;
  email: string;
  roles: UserRole;
}
