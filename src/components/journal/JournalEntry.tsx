import { DateTime } from 'luxon';
import type { Note } from '@/types/notes';

interface Props {
  entry: Partial<Note>;
  onClick: (entry: Partial<Note>) => void;
  isActive?: boolean;
}

const JournalEntry = ({ entry, onClick, isActive = false }: Props) => {
  const noteDate = DateTime.fromMillis(entry.date as number);

  const handleClick = () => {
    onClick(entry);
  };

  return (
    <div
      role="presentation"
      className={`journal__entry pointer ${
        isActive ? 'journal__entry-active' : ''
      }`}
      onClick={handleClick}>
      {entry.imageUrl !== undefined && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundImage: `url("${entry.imageUrl}")`,
          }}
        />
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">{entry.title}</p>
        <p className="journal__entry-content">{entry.body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.toLocaleString({ weekday: 'long' })}</span>
        <h4>{noteDate.toLocaleString({ day: 'numeric' })}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
