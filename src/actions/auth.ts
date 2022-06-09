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
import type { ActionReducer } from '@/types';
import type { AuthState } from '@/types/auth';
import { uiSetError, uiStartLoading, uiStopLoading } from './ui';

export const startLoginWithEmailAndPassword =
  (
    email: string,
    password: string
  ): ThunkAction<void, AuthState, unknown, AnyAction> =>
    async (dispatch) => {
      dispatch(uiStartLoading());
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed in
        const { user } = userCredential;
        const { displayName, uid, photoURL } = user;
        log('success', 'user logged', { displayName, uid, photoURL });
        dispatch(login(uid, displayName, photoURL));
      } catch (error) {
        log('error', 'error', error);
        dispatch(uiSetError((error as Error)?.message));
      } finally {
        dispatch(uiStopLoading());
      }
    };

export const startLoginWithGoogle =
  (): ThunkAction<void, AuthState, unknown, AnyAction> => async (dispatch) => {
    dispatch(uiStartLoading());
    try {
      const auth = getAuth();
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credentialFromResult =
        GoogleAuthProvider.credentialFromResult(userCredential);
      const token = credentialFromResult?.accessToken;
      // The signed-in user info.
      const { user } = userCredential;
      const { displayName, uid, photoURL } = user;
      log('success', 'user logged with google - credential', {
        token,
        displayName,
        uid,
        photoURL,
      });
      dispatch(login(uid, displayName, photoURL));
    } catch (error) {
      log('error', 'error', error);
      dispatch(uiSetError((error as Error)?.message));
    } finally {
      dispatch(uiStopLoading());
    }
  };

export const startRegisterWithEmailAndPassword =
  (
    email: string,
    password: string,
    name: string
  ): ThunkAction<void, AuthState, unknown, AnyAction> =>
    async (dispatch) => {
      dispatch(uiStartLoading());
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Signed in
        const { user } = userCredential;
        await updateProfile(auth.currentUser ?? user, { displayName: name });
        // Profile updated!
        const { displayName, uid, photoURL } = auth.currentUser ?? user;
        log('info', 'user registered', {
          currentUser: auth.currentUser,
          displayName,
          uid,
        });
        dispatch(login(uid, displayName, photoURL));
      } catch (error) {
        log('error', 'error', error);
        dispatch(uiSetError((error as Error)?.message));
      } finally {
        dispatch(uiStopLoading());
      }
    };

export const login = (
  uid: string,
  name: string | null,
  photoURL: string | null
): ActionReducer => ({
  type: actionTypes.login,
  payload: { uid, name, photoURL },
});

export const startLogout =
  (): ThunkAction<void, AuthState, unknown, AnyAction> => async (dispatch) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Sign-out successful.
      log('info', 'user logged out');
      dispatch(logout());
    } catch (error) {
      log('error', 'error', error);
    }
  };

export const logout = (): ActionReducer => ({
  type: actionTypes.logout,
});
