import { useSelector } from 'react-redux';
import type { AppState } from '@/types';
import NoteScreen from '../notes/NoteScreen';
import NothingSelected from './NothingSelected';
import Sidebar from './Sidebar';

// This key is used to form the component to remount
// so useForm use new state
// Instead of that, we will reset useForm state on NoteScreen
// whenever state changes
// <NoteScreen key={activeNote.id} />

const JournalScreen = () => {
  const activeNote = useSelector((state: AppState) => state.notes.active);

  return (
    <div className="journal__main-content">
      <Sidebar />

      <main>{activeNote !== null ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;
