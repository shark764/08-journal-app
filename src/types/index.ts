import type { AuthState } from './auth';
import type { UIState } from './ui';

export interface AppState {
  auth: AuthState;
  ui: UIState;
}
