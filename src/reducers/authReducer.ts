/**
 * state {
 *    uid: 'abcd12349876vxyz',
 *    name: 'Daniel Hernandez'
 * }
 */

import { actionTypes } from '@/shared/actionTypes';
import type { AuthAction, AuthState, AuthUser } from '@/types/auth';

const initialState: AuthState = {};

// eslint-disable-next-line default-param-last
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case actionTypes.login: {
      const { uid, name } = action.payload as AuthUser;
      return {
        uid,
        name,
      };
    }

    case actionTypes.logout:
      return {};

    default:
      return state;
  }
};

export default authReducer;
