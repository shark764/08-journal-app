import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '@/firebase/config';
import { loadNotes } from '@/helpers/loadNotes';
import { actionTypes } from '@/shared/actionTypes';
import type { ActionReducer, AppThunkAction } from '@/types';
import type { Note } from '@/types/notes';

export const startNewNote =
  (): AppThunkAction => async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote: Partial<Note> = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const docRef = await addDoc(
      collection(db, `${uid as string}/journal/notes`),
      newNote
    );
    const { id } = docRef;

    dispatch(setActiveNote({ id, ...newNote }));
  };

export const notesAddNew = (note: Partial<Note>): ActionReducer => ({
  type: actionTypes.notesAddNew,
  payload: {
    note,
  },
});

export const setActiveNote = (note: Partial<Note>): ActionReducer => ({
  type: actionTypes.notesSetActive,
  payload: {
    note,
  },
});

export const startLoadNotes =
  (): AppThunkAction => async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid as string);
    dispatch(setNotes(notes));
  };

export const setNotes = (notes: Array<Partial<Note>>): ActionReducer => ({
  type: actionTypes.notesLoad,
  payload: {
    notes,
  },
});

export const saveNote =
  (note: Partial<Note>): AppThunkAction =>
    async (_, getState) => {
      const { uid } = getState().auth;
      const { id, ...restNote } = note;
      const noteToFirestore = {
        ...restNote,
        date: new Date().getTime(),
      };
      await setDoc(
        doc(db, `${uid as string}/journal/notes`, id as string),
        noteToFirestore,
        { merge: true }
      );

      void Swal.fire('Saved', note.title, 'success');

    // Not necessary to dispatch this, since snapshot subscriber
    // takes care of refreshing data
    // dispatch(updateNote({ id, ...noteToFirestore }));
    };

export const updateNote = (note: Partial<Note>): ActionReducer => ({
  type: actionTypes.notesUpdated,
  payload: {
    note,
  },
});

// export const startNewNote2 =
//   (note: Partial<Note>): AppThunkAction =>
//   async (dispatch, getState) => {
//     try {
//       const { uid } = getState().auth;
//       const auth = getAuth();
//       await signOut(auth);
//       // Sign-out successful.
//       log('info', 'user logged out');
//       dispatch(logout());
//     } catch (error) {
//       log('error', 'error', error);
//     }
//   };
