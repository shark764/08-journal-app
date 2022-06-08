import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

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

export type AuthThunkDispatch = ThunkDispatch<AuthState, unknown, AnyAction>;

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
