/**
 * state {
 *    uid: 'abcd12349876vxyz',
 *    name: 'Daniel Hernandez',
 *    photoURL: 'https://example.com/jane-q-user/profile.jpg'
 * }
 */

import { actionTypes } from '@/shared/actionTypes';
import type { ActionReducer } from '@/types';
import type { AuthState, AuthUser } from '@/types/auth';

const initialState: AuthState = {};

const authReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ActionReducer
): AuthState => {
  switch (action.type) {
    case actionTypes.login: {
      return {
        ...(action.payload as AuthUser),
      };
    }

    case actionTypes.logout:
      return {};

    default:
      return state;
  }
};

export default authReducer;
