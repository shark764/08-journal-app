import type { ChangeEvent } from 'react';
import { DateTime } from 'luxon';

interface Props {
  date: number;
  handleSave: () => void;
  handleDiscard: () => void;
  handlePicture: (file: File) => void;
}

const NotesAppBar = ({
  date,
  handleSave,
  handleDiscard,
  handlePicture,
}: Props) => {
  const noteDate = DateTime.fromMillis(date);

  const handlePictureClick = () => {
    (document.querySelector('#fileSelector') as HTMLInputElement).click();
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.item(0) ?? null;
    if (file !== null) {
      handlePicture(file);
    }
  };

  return (
    <div className="notes__app-bar">
      <span>{noteDate.toLocaleString(DateTime.DATE_FULL)}</span>

      <input
        type="file"
        id="fileSelector"
        name="fileSelector"
        // accept="image/*"
        accept="image/png, image/jpeg"
        aria-label="Upload an image"
        className="hidden"
        onChange={handleFileChange}
      />

      <div>
        <button type="button" className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button type="button" className="btn" onClick={handleDiscard}>
          Discard
        </button>
        <button type="button" className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
