import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export interface Note {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  date: number;
}

export interface NotesState {
  notes: Array<Partial<Note>>;
  active: Partial<Note> | null;
}

export type NotesThunkDispatch = ThunkDispatch<NotesState, unknown, AnyAction>;

export interface NoteFormValues {
  title: string;
  body: string;
  imageUrl: string;
}
