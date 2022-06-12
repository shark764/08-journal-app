import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '@/actions/notes';
import type { AppState } from '@/types';
import type { Note } from '@/types/notes';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {
  const entries = useSelector((state: AppState) => state.notes.notes);
  const activeNote = useSelector((state: AppState) => state.notes.active);
  const dispatch = useDispatch();

  const handleClick = (entry: Partial<Note>) => {
    dispatch(setActiveNote(entry));
  };

  return (
    <div className="journal__entries">
      {entries.map((entry) => (
        <JournalEntry
          key={entry.id}
          entry={entry}
          onClick={handleClick}
          isActive={activeNote !== null && entry.id === activeNote?.id}
        />
      ))}
    </div>
  );
};

export default JournalEntries;
