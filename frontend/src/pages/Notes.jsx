import React, { useEffect, useState } from "react";
import { useUserContext } from "../UserContext";
import "./Notes.scss";
import SingleNote from "../components/notes/SingleNote";
import { Outlet, useParams } from "react-router";
import { getNotesByUser } from "../api";
import Search from "../components/notes/Search";
import toast from 'react-hot-toast'

export default function Notes() {
  const { userId } = useParams();
  const { user } = useUserContext();
  const [notes, setNotes] = useState([]);
  const [displayedNotes, setDisplayedNotes] = useState([]);

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
      .catch((err) => toast.error(err.message));
  }, [user.notes, userId]);

  return (
    <div className="notes-container">
      <Search
        key={userId}
        userId={userId}
        setDisplayedNotes={setDisplayedNotes}
        notes={notes}
        displayedNotes={displayedNotes}
      />
      <div className="notes">
        {displayedNotes.map((note) => (
          <SingleNote key={note._id} note={note} />
        ))}
        <Outlet context={{setNotes}} />
      </div>
    </div>
  );
}
