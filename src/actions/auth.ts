import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { googleAuthProvider } from '@/firebase/config';
import { actionTypes } from '@/shared/actionTypes';
import type { AuthAction, AuthState } from '@/types/auth';
import { faker } from '@faker-js/faker';

export const startLoginWithEmailAndPassword =
  (
    email: string,
    password: string
  ): ThunkAction<void, AuthState, unknown, AnyAction> =>
  // eslint-disable-next-line require-await, @typescript-eslint/require-await
    async (dispatch) => {
      setTimeout(() => {
        console.log('thunk', email, password);

        dispatch(login(faker.datatype.uuid(), faker.name.findName()));
      }, 1500);
    };

export const startLoginWithGoogle =
  (): ThunkAction<void, AuthState, unknown, AnyAction> =>
  // eslint-disable-next-line require-await, @typescript-eslint/require-await
    async (dispatch) => {
      const auth = getAuth();
      const result = await signInWithPopup(auth, googleAuthProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const { user } = result;
      const { displayName, uid } = user;
      console.log('credential', { token, user });

      dispatch(login(uid, displayName ?? ''));
    };

export const login = (uid: string, name: string): AuthAction => ({
  type: actionTypes.login,
  payload: {
    uid,
    name,
  },
});
