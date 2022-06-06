import JournalEntries from './JournalEntries';

const Sidebar = () => (
  <aside className="journal__sidebar">
    <div className="journal__sidebar-navbar">
      <h3 className="mt-5">
        <i className="far fa-moon" />
        <span> It&#39;s me</span>
      </h3>

      <button type="button" className="btn">
        Log Out
      </button>
    </div>

    <div className="journal__new-entry pointer">
      <i className="far fa-calendar-plus fa-5x" />
      <p className="mt-5">New entry</p>
    </div>

    <JournalEntries />
  </aside>
);

export default Sidebar;
