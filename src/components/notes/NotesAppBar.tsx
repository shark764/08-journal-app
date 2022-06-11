import { DateTime } from 'luxon';

interface Props {
  date: number;
  handleSave: () => void;
  handlePicture: () => void;
}

const NotesAppBar = ({ date, handleSave, handlePicture }: Props) => {
  const noteDate = DateTime.fromMillis(date);

  return (
    <div className="notes__app-bar">
      <span>{noteDate.toLocaleString(DateTime.DATE_FULL)}</span>

      <div>
        <button type="button" className="btn" onClick={handlePicture}>
          Picture
        </button>
        <button type="button" className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
