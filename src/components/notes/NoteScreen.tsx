import NotesAppBar from './NotesAppBar';

const NoteScreen = () => (
  <div className="notes__main-content">
    <NotesAppBar />

    <div className="notes__content">
      <input
        type="text"
        placeholder="Some awesome placeholder"
        className="notes__title-input"
        autoComplete="off"
      />

      <textarea
        placeholder="What happened today?"
        className="notes__textarea"
      />

      <div className="notes__image">
        <img
          src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-1053735888-scaled.jpg?resize=1536,1024"
          alt="Your note!"
        />
      </div>
    </div>
  </div>
);

export default NoteScreen;
