import { actionTypes } from '@/shared/actionTypes';
import type { ActionReducer } from '@/types';
import type { UIState } from '@/types/ui';

const initialState: UIState = {
  loading: false,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const uiReducer = (state = initialState, action: ActionReducer): UIState => {
  switch (action.type) {
    case actionTypes.uiSetLoading: {
      const { loading } = action.payload as { loading: boolean; };
      return {
        ...state,
        loading,
      };
    }
    case actionTypes.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.uiStopLoading:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.uiSetError: {
      const { errorMessage } = action.payload as {
        errorMessage: string | null;
      };
      return {
        ...state,
        errorMessage,
      };
    }
    case actionTypes.uiRemoveError:
      return {
        ...state,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default uiReducer;
