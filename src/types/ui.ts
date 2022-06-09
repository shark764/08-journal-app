import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export interface UIState {
  loading: boolean;
  errorMessage?: string | null;
}

export type UIThunkDispatch = ThunkDispatch<UIState, unknown, AnyAction>;
