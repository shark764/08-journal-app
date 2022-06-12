import { useEffect } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  // where,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { setNotes } from '@/actions/notes';
import JournalScreen from '@/components/journal/JournalScreen';
import { db } from '@/firebase/config';
import type { AppState, AppThunkDispatch } from '@/types';
import type { Note } from '@/types/notes';

const JournalRouter = () => {
  const userUid = useSelector((state: AppState) => state.auth.uid);
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect(() => {
    const q = query(
      collection(db, `${userUid as string}/journal/notes`),
      // where('title', '!=', ''),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(q, (notesSnapshot) => {
      const notes: Array<Partial<Note>> = [];

      // TODO:
      // Update only document that changed
      notesSnapshot.docChanges().forEach(({ doc }) => {
        console.log('DocumentChanged', {
          id: doc.id,
          ...doc.data(),
          doc,
          exists: doc.exists(),
        });
      });

      notesSnapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
      });

      // const source = notesSnapshot.metadata.hasPendingWrites
      //   ? 'Local'
      //   : 'Server';

      dispatch(setNotes(notes));
    });

    // unsubscribe on unmount
    return unsubscribe;
  }, [dispatch, userUid]);

  return (
    <div className="journal__main">
      <Routes>
        {/* <Route path="*" element={<JournalScreen />} /> */}
        <Route index element={<JournalScreen />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default JournalRouter;
