import type { AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { AuthState } from './auth';
import type { NotesState } from './notes';
import type { UIState } from './ui';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  notes: NotesState;
}

export interface ActionReducer {
  type: string;
  payload?: any;
}

export type DispatchReducer = (args: ActionReducer) => ActionReducer;

export type AppThunkDispatch = ThunkDispatch<AppState, unknown, AnyAction>;

export type AppThunkAction = ThunkAction<void, AppState, unknown, AnyAction>;
