import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export interface UIState {
  loading?: boolean;
  errorMessage?: string | null;
}

export interface UIAction {
  type: string;
  payload: any;
}

export type UIDispatch = (args: UIAction) => UIAction;

export type UIThunkDispatch = ThunkDispatch<UIState, unknown, AnyAction>;
