export interface RegisterResponse {
  code: number;
  message: string;
  username: string;
  token: string;
  expirationAt: string;
  tenant: string;
  id: string;
}
