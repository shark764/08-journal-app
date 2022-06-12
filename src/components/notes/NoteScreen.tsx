import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  discardNote,
  saveNote,
  startDeleteNote,
  startUpload,
} from '@/actions/notes';
import useForm from '@/hooks/useForm';
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
  const { title, body } = formState;
  const imageUrl = activeNote?.imageUrl;

  useEffect(() => {
    if (activeNote?.id !== activeId.current) {
      resetForm({
        ...activeNote,
      });
      activeId.current = activeNote?.id;
    }
  }, [activeNote, resetForm]);

  const handlePicture = (file: File) => {
    dispatch(startUpload(file));
  };

  const handleSave = () => {
    dispatch(
      saveNote({
        ...activeNote,
        title,
        body,
        imageUrl,
      })
    );
  };

  const handleDiscard = () => {
    dispatch(discardNote());
  };

  const handleDelete = () => {
    dispatch(startDeleteNote(activeNote?.id as string));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar
        date={activeNote?.date as number}
        handleSave={handleSave}
        handleDiscard={handleDiscard}
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

      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
