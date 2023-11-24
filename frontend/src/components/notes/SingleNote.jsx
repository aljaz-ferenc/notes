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
    navigate(`${note._id}`);
    console.log("clicked ", note._id);
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

// function handleUpdateNote() {
//   const updatedFields = {};
//   if (note.title !== title) updatedFields.title = title;
//   if (note.content !== content) updatedFields.content = content;
//   if (Object.entries(updatedFields).length === 0) return setIsEditing(false);

//   updateNote(note._id, updatedFields)
//     .then((res) => {
//       if (res.status === "success") {
//         updateNotes(res.data);
//       } else {
//         throw new Error(res.message);
//       }
//     })
//     .catch((err) => console.log(err.message))
//     .finally(() => {
//       setIsEditing(false);
//     });
// }

// function handleDeleteNote() {
//   deleteNote(note._id)
//     .then((res) => {
//       if (res.status === "success") {
//         console.log(res.data);
//         updateNotes(res.data);
//       } else {
//         throw new Error(res.message);
//       }
//     })
//     .catch((err) => console.log(err.message))
//     .finally(() => {
//       setTitle("");
//       setContent("");
//       navigate("../");
//     });
// }
