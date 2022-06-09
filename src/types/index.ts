import type { AuthState } from './auth';
import type { UIState } from './ui';

export interface AppState {
  auth: AuthState;
  ui: UIState;
}

export interface ActionReducer {
  type: string;
  payload?: any;
}

export type DispatchReducer = (args: ActionReducer) => ActionReducer;
