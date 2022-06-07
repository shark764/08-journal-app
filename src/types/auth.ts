export interface AuthUser {
  uid: string;
  name: string;
}

export interface AuthState {
  uid?: string;
  name?: string;
}

export interface AuthAction {
  type: string;
  payload: any;
}

export type AuthDispatch = (args: AuthAction) => AuthAction;

export interface LoginFormValues {
  email: string;
  password: string;
}
