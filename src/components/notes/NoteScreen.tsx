import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNote } from '@/actions/notes';
import useForm from '@/hooks/useForm';
import { log } from '@/shared/utils';
import type { AppState, AppThunkDispatch } from '@/types';
import type { NoteFormValues } from '@/types/notes';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  const dispatch: AppThunkDispatch = useDispatch();
  const activeNote = useSelector((state: AppState) => state.notes.active);
  const activeId = useRef(activeNote?.id);
  const [formState, handleInputChange, resetForm] = useForm<NoteFormValues>({
    ...activeNote,
  });
  const { title, body, imageUrl } = formState;

  useEffect(() => {
    if (activeNote?.id !== activeId.current) {
      resetForm({
        ...activeNote,
      });
      activeId.current = activeNote?.id;
    }
  }, [activeNote, resetForm]);

  const handlePicture = () => {
    log('info', 'picture');
  };

  const handleSave = () => {
    dispatch(
      saveNote({
        ...activeNote,
        title,
        body,
        imageUrl: imageUrl ?? 'https://i.redd.it/3w8r1ji2kup21.jpg',
      })
    );
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar
        date={activeNote?.date as number}
        handleSave={handleSave}
        handlePicture={handlePicture}
      />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome placeholder"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        />

        {imageUrl !== undefined && (
          <div className="notes__image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteScreen;
