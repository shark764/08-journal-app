import { actionTypes } from '@/shared/actionTypes';
import type { UIAction, UIState } from '@/types/ui';

const initialState: UIState = {
  loading: false,
  errorMessage: null,
};

// eslint-disable-next-line default-param-last
const uiReducer = (state = initialState, action: UIAction): UIState => {
  switch (action.type) {
    case actionTypes.uiSetLoading: {
      const { loading } = action.payload as { loading: boolean; };
      return {
        ...state,
        loading,
      };
    }

    case actionTypes.uiSetError: {
      const { errorMessage } = action.payload as { errorMessage: string; };
      return {
        ...state,
        errorMessage,
      };
    }

    case actionTypes.uiRemoveError: {
      return {
        ...state,
        errorMessage: null,
      };
    }

    default:
      return state;
  }
};

export default uiReducer;
