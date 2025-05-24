export interface Authority {
  authority: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  telephone: string | null;
  isAdmin: boolean;
  isEnabled: boolean;
  isBan: boolean;
  isPremium: boolean;
  limitPerDay: number;
  roles: string[];
  authorities: Authority[];
  tenantId: string;
  createdBy: string | null;
}
