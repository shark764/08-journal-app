import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import { googleAuthProvider } from '@/firebase/config';
import { actionTypes } from '@/shared/actionTypes';
import { log } from '@/shared/utils';
import type { AuthAction, AuthState } from '@/types/auth';

export const startLoginWithEmailAndPassword =
  (
    email: string,
    password: string
  ): ThunkAction<void, AuthState, unknown, AnyAction> =>
    async (dispatch) => {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const { user } = userCredential;
      const { displayName, uid } = user;
      log('success', 'user logged', user);

      dispatch(login(uid, displayName ?? ''));
    };

export const startLoginWithGoogle =
  (): ThunkAction<void, AuthState, unknown, AnyAction> => async (dispatch) => {
    const auth = getAuth();
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credentialFromResult =
      GoogleAuthProvider.credentialFromResult(userCredential);
    const token = credentialFromResult?.accessToken;
    // The signed-in user info.
    const { user } = userCredential;
    const { displayName, uid } = user;
    log('success', 'user logged with google - credential', { token, user });

    dispatch(login(uid, displayName ?? ''));
  };

export const startRegisterWithEmailAndPassword =
  (
    email: string,
    password: string,
    name: string
  ): ThunkAction<void, AuthState, unknown, AnyAction> =>
    async (dispatch) => {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const { user } = userCredential;

      await updateProfile(auth.currentUser ?? user, {
        displayName: name,
      });
      // Profile updated!

      const { displayName, uid } = auth.currentUser ?? user;

      log('info', 'user registered', {
        currentUser: auth.currentUser,
        displayName,
        uid,
      });

      dispatch(login(uid, displayName ?? ''));
    };

export const login = (uid: string, name: string): AuthAction => ({
  type: actionTypes.login,
  payload: {
    uid,
    name,
  },
});

export const logout =
  (): ThunkAction<void, AuthState, unknown, AnyAction> => async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    // Sign-out successful.
    log('info', 'user logged out');

    dispatch({
      type: actionTypes.logout,
      payload: null,
    });
  };
