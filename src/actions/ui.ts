import { actionTypes } from '@/shared/actionTypes';
import type { UIAction } from '@/types/ui';

export const uiSetLoading = (loading: boolean): UIAction => ({
  type: actionTypes.uiSetLoading,
  payload: {
    loading,
  },
});

export const uiSetError = (errorMessage: string): UIAction => ({
  type: actionTypes.uiSetError,
  payload: {
    errorMessage,
  },
});

export const uiRemoveError = (): UIAction => ({
  type: actionTypes.uiRemoveError,
  payload: null,
});
