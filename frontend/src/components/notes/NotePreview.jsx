import { useEffect, useRef, useState } from "react";
import "./NotePreview.scss";
import { useNavigate, useParams } from "react-router";

function Note({ note, selectedNote, ref }) {
  const inputRef = useRef();
  const textAreaRef = useRef();
  const [content, setContent] = useState(note.content);
  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    if (!selectedNote || selectedNote.id !== note._id) return;
    if (selectedNote.part === "title") inputRef.current.focus();
    if (selectedNote.part === "content") {
      textAreaRef.current.focus();
      resizeTextarea();
    }
  }, [selectedNote]);

  function handlePreviewClick() {
    if (noteId === note._id) return;
    navigate(`/notes/${note._id}`);
  }

  return (
    <div
      className={`note-preview ${noteId === note._id ? "active" : ""}`}
      ref={ref}
      onClick={handlePreviewClick}
    >
      <h3 className="note-preview__title">{note.title}</h3>
      {selectedNote &&
      selectedNote.id === note._id &&
      selectedNote.part === "content" ? (
        <textarea
          onChange={handleTextareaChange}
          ref={textAreaRef}
          value={content}
        />
      ) : (
        <p className="note-preview__content">
          <p>
            {note.content.slice(0, 80)}
            {note.content.slice(0, 80).length > 79 && "..."}
          </p>
        </p>
      )}
    </div>
  );
}
