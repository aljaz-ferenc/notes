import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useUserContext } from "../../UserContext";
import "./SingleNote.scss";
import NoteOptions from "./NoteOptions";
import { deleteNote, updateNote } from "../../api";
import { dateFormatter } from "../../functions/utils";

export default function SingleNote({ note }) {
  const navigate = useNavigate();
  const noteRef = useRef();
  const content = note.content.slice(0, 250);

  function handleNoteClick(e) {
    e.stopPropagation(); 
    navigate(`./${note._id}`);
  }

  return (
    <div className="single-note-container" ref={noteRef} onClick={handleNoteClick}>
      <p className="single-note__date">
        {dateFormatter.format(new Date(note.createdAt))}
      </p>
      <div className="single-note">
        <h3 className="single-note__title">{note.title}</h3>
        <p className="single-note__content">{content}...</p>
      </div>
    </div>
  );
}
