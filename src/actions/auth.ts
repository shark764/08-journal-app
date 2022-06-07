import { actionTypes } from '@/shared/actionTypes';
import type { AuthAction } from '@/types/auth';

export const login = (uid: string, name: string): AuthAction => ({
  type: actionTypes.login,
  payload: {
    uid,
    name,
  },
});
