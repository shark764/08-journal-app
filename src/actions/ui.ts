import { actionTypes } from '@/shared/actionTypes';
import type { ActionReducer } from '@/types';

export const uiSetLoading = (loading: boolean): ActionReducer => ({
  type: actionTypes.uiSetLoading,
  payload: {
    loading,
  },
});

export const uiStartLoading = (): ActionReducer => ({
  type: actionTypes.uiStartLoading,
});

export const uiStopLoading = (): ActionReducer => ({
  type: actionTypes.uiStopLoading,
});

export const uiSetError = (errorMessage: string): ActionReducer => ({
  type: actionTypes.uiSetError,
  payload: {
    errorMessage,
  },
});

export const uiRemoveError = (): ActionReducer => ({
  type: actionTypes.uiRemoveError,
});
