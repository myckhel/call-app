import { User } from "./Call";

export interface RootState {
  call: CallState;
  auth: AuthState;
  app: AppState;
}

export interface CallState {
  otherUserId?: number | string;
}

export interface AuthState {
  user?: User;
}

export interface AppState {
  init: boolean;
  users: {
    onlines: User[];
  };
}
