import React, { useState } from "react";
import { useUserContext } from "../UserContext";
import NotePreview from "../components/notes/NotePreview";
import "./Notes.scss";
import SingleNote from "../components/notes/SingleNote";
import { Outlet, useLocation } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export default function Notes() {
  const { user } = useUserContext();
  const [selectedNote, setSelectedNote] = useState(null);
  const location = useLocation();

  function actionFinished(wasSuccessful, message){
    if(wasSuccessful){
      toast.success(message)
    }else{
      toast.error(message)
    }
  }

  return (
    <div className="notes">
      <Toaster position="top-center"/>
      {user.notes.map((note) => (
        <SingleNote key={note._id} note={note} />
      ))}
      <Outlet context={actionFinished}/>
    </div>
  );
}
