import React, { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";
import NotePreview from "../components/notes/NotePreview";
import "./Notes.scss";
import SingleNote from "../components/notes/SingleNote";
import { Outlet, useLocation, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { getNotesByUser } from "../api";

export default function Notes() {
  const { userId } = useParams();
  const { user } = useUserContext();
  const [notes, setNotes] = useState();

  useEffect(() => {
    if (userId === user.id) return setNotes(user.notes);

    getNotesByUser(userId)
      .then((res) => {
        if (res.status === "success") {
          setNotes(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err.message));
  }, [user.notes, userId]);
 

  return (
    <div className="notes">
      <Toaster position="top-center" />
      {notes && notes.map((note) => <SingleNote key={note._id} note={note} />)}
      <Outlet />
    </div>
  );
}
