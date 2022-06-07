import JournalEntry from './JournalEntry';

const JournalEntries = () => {
  const entries = [1, 2, 3, 4, 5];

  return (
    <div className="journal__entries">
      {entries.map((entry) => (
        <JournalEntry key={entry.toString()} entry={entry} />
      ))}
    </div>
  );
};

export default JournalEntries;
