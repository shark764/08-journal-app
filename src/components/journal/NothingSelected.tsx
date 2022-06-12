import { useDispatch } from 'react-redux';
import { startNewNote } from '@/actions/notes';
import type { AppThunkDispatch } from '@/types';

const NothingSelected = () => {
  const dispatch: AppThunkDispatch = useDispatch();

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <div className="nothing__main-content animate__animated animate__fadeInRight animate__faster">
      <p>
        Select something
        <br />
        or
        <button type="button" onClick={handleAddNew}>
          create an entry
        </button>
      </p>

      <i className="far fa-star fa-4x mt-5" />
    </div>
  );
};

export default NothingSelected;
