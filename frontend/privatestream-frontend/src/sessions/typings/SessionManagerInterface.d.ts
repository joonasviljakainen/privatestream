import { LoginCredentials } from "../../../../../backend/privatestream-backend/typings/LoginCredentials";

export interface SessionManagerInterface {
  signup: (
    credentials: LoginCredentials
  ) => Promise<AxionsResponse<{ token: string }>>;
  /*login: (
    credentials: LoginCredentials
  ) => Promise<AxionsResponse<{ token: string }>>;*/
  //logout: () => void;
  //validateToken: () => {};
  //refreshSession: () => {};
}
