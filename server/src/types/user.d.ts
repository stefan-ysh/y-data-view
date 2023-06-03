export interface User {
  id?: number;
  userName: string;
  password: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}
export interface GetUserList {
  offset?: number;
  limit?: number;
}