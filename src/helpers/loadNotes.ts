import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import type { Note } from '@/types/notes';

export const loadNotes = async (uid: string): Promise<Array<Partial<Note>>> => {
  const notes: Array<Partial<Note>> = [];
  const notesSnapshot = await getDocs(collection(db, `${uid}/journal/notes`));
  notesSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    notes.push({ id: doc.id, ...doc.data() });
  });

  console.log('file: loadNotes.ts ~ line 7 ~ loadNotes ~ notes', notes);

  return notes;
};
