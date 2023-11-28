import React, { useRef } from "react";
import { useNavigate } from "react-router";
import "./SingleNote.scss";
import { dateFormatter } from "../../functions/utils";

export default function SingleNote({ note }) {
  const navigate = useNavigate();
  const noteRef = useRef();
  const content = note.content.slice(0, 400);

  function handleNoteClick(e) {
    e.stopPropagation();
    navigate(`./${note._id}`);
  }

  return (
    <div
      className="single-note-container"
      ref={noteRef}
      onClick={handleNoteClick}
    >
      <p className="single-note__date">
        {dateFormatter.format(new Date(note.createdAt))}
      </p>
      <div className="single-note">
        <h3 className="single-note__title">{note.title}</h3>
        <p className="single-note__content">{content}{note.content.length > 400 && '...'}</p>
      </div>
    </div>
  );
}
