import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLogout } from '@/actions/auth';
import type { AppState } from '@/types';
import type { AuthThunkDispatch } from '@/types/auth';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch: AuthThunkDispatch = useDispatch();
  const displayName = useSelector((state: AppState) => state.auth.name);
  const photoURL = useSelector((state: AppState) => state.auth.photoURL);

  const handleLogout = () => {
    dispatch(startLogout());
    navigate('/auth', { replace: true });
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="journal__sidebar-user mt-5">
          {/* <i className="far fa-moon" /> */}
          <Avatar
            name={displayName}
            src={photoURL ?? undefined}
            className="journal__sidebar-avatar"
            size="40"
            textSizeRatio={1.75}
            round
          />
          <span className="journal__sidebar-displayName">{displayName}</span>
        </h3>

        <button type="button" className="btn" onClick={handleLogout}>
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
};

export default Sidebar;
