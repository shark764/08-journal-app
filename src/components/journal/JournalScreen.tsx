import NoteScreen from '../notes/NoteScreen';
// import NothingSelected from './NothingSelected';
import Sidebar from './Sidebar';

const JournalScreen = () => (
  <div className="journal__main-content">
    <Sidebar />

    <main>
      <NoteScreen />
      {/* <NothingSelected /> */}
    </main>
  </div>
);

export default JournalScreen;
