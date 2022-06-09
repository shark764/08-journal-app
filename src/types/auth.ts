import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export interface AuthUser {
  uid: string;
  name: string;
  photoURL?: string | null;
}

export interface AuthState {
  uid?: string;
  name?: string;
  photoURL?: string | null;
}

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
