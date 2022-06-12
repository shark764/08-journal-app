import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { googleAuthProvider } from '@/firebase/config';
import { actionTypes } from '@/shared/actionTypes';
import { log } from '@/shared/utils';
import type { ActionReducer, AppThunkAction } from '@/types';
import { cleanup } from './notes';
import { uiSetError, uiStartLoading, uiStopLoading } from './ui';

export const startLoginWithEmailAndPassword =
  (email: string, password: string): AppThunkAction =>
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
        void Swal.fire('Failed', (error as Error)?.message, 'error');
      } finally {
        dispatch(uiStopLoading());
      }
    };

export const startLoginWithGoogle = (): AppThunkAction => async (dispatch) => {
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
    void Swal.fire('Failed', (error as Error)?.message, 'error');
  } finally {
    dispatch(uiStopLoading());
  }
};

export const startRegisterWithEmailAndPassword =
  (email: string, password: string, name: string): AppThunkAction =>
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
        void Swal.fire('Failed', (error as Error)?.message, 'error');
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

export const startLogout = (): AppThunkAction => async (dispatch) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    // Sign-out successful.
    dispatch(logout());
    dispatch(cleanup());
  } catch (error) {
    log('error', 'error', error);
  }
};

export const logout = (): ActionReducer => ({
  type: actionTypes.logout,
});
