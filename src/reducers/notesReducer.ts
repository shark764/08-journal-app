/**
 * state: {
 *    notes: Note[],
 *    active: {
 *      id: string;
 *      title: string;
 *      body: string;
 *      imageUrl: string;
 *      date: number;
 *    } | null
 * }
 */

import { actionTypes } from '@/shared/actionTypes';
import type { ActionReducer } from '@/types';
import type { Note, NotesState } from '@/types/notes';

const initialState: NotesState = {
  notes: [
    // {
    //   id: 'abc123',
    //   title: 'An awesome entry',
    //   body: 'Some sh... here',
    //   imageUrl:
    //     'https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(11).jpg',
    //   date: 1654792248526,
    // },
  ],
  active: null,
};

const notesReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ActionReducer
): NotesState => {
  switch (action.type) {
    case actionTypes.notesAddNew: {
      const { note } = action.payload as { note: Partial<Note>; };
      return {
        ...state,
        notes: [...state.notes, note],
      };
    }

    case actionTypes.notesSetActive: {
      const { note } = action.payload as { note: Partial<Note>; };
      return {
        ...state,
        active: note,
      };
    }

    case actionTypes.notesLoad: {
      const { notes } = action.payload as { notes: Array<Partial<Note>>; };
      return {
        ...state,
        notes,
      };
    }

    case actionTypes.notesUpdated: {
      const { note } = action.payload as { note: Partial<Note>; };
      console.log(note, state.notes);
      return {
        ...state,
        notes: state.notes.map((item) =>
          item.id === note.id ? { ...item, ...note } : item
        ),
      };
    }

    default:
      return state;
  }
};

export default notesReducer;
