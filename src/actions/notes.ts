import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '@/firebase/config';
import { fileUpload } from '@/helpers/fileUpload';
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

export const discardNote = (): AppThunkAction => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const activeNote = getState().notes.active;
  if (activeNote?.title?.trim() === '') {
    await deleteDoc(
      doc(db, `${uid as string}/journal/notes`, activeNote.id as string)
    );
  }
  dispatch(clearActiveNote());
};

export const clearActiveNote = (): ActionReducer => ({
  type: actionTypes.notesClearActive,
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
    async (dispatch, getState) => {
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
      dispatch(clearActiveNote());

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

export const startUpload =
  (file: File): AppThunkAction =>
    async (dispatch, getState) => {
      const activeNote = getState().notes.active;

      void Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const secureFileUrl = await fileUpload(file);
      const updatedActiveNote: Partial<Note> = {
        ...activeNote,
        imageUrl: secureFileUrl,
      };

      Swal.close();

      dispatch(setActiveNote(updatedActiveNote));
    };

export const startDeleteNote =
  (id: string): AppThunkAction =>
    async (dispatch, getState) => {
      const { uid } = getState().auth;
      const activeNote = getState().notes.active;

      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
      if (result.isConfirmed) {
        await deleteDoc(doc(db, `${uid as string}/journal/notes`, id));
        if (activeNote?.id === id) {
          dispatch(clearActiveNote());
        }
        void Swal.fire('Deleted!', 'The document has been deleted.', 'success');
      // onSnapshot will take care of this
      // dispatch(deleteNote(id));
      }
    };

export const deleteNote = (id: string): ActionReducer => ({
  type: actionTypes.notesDeleted,
  payload: {
    id,
  },
});

export const cleanup = (): ActionReducer => ({
  type: actionTypes.notesCleanup,
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
