interface Props {
  entry: number;
}

const JournalEntry = ({ entry }: Props) => (
  <div className="journal__entry pointer">
    <div
      className="journal__entry-picture"
      style={{
        backgroundSize: 'cover',
        backgroundImage:
          'url("https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(11).jpg")',
      }}
    />
    <div className="journal__entry-body">
      <p className="journal__entry-title">A new hope!</p>
      <p className="journal__entry-content">
        Some random and utter bullshi...! {entry}
      </p>
    </div>

    <div className="journal__entry-date-box">
      <span>Monday</span>
      <h4>28</h4>
    </div>
  </div>
);

export default JournalEntry;
