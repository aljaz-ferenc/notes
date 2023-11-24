import "./NoteOptions.scss";
import { FaRegEdit } from "react-icons/fa";
import { LiaSaveSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import Button from "../ui/Button";
import { deleteNote, updateNote } from "../../api";
import { useNavigate } from "react-router";
import { useUserContext } from "../../UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function NoteOptions({
  note,
  title,
  content,
  onResponse,
  tags,
}) {
  const navigate = useNavigate();
  const { user, updateNotes, updateOne } = useUserContext();

  function handleUpdateNote() {
    //don't update, if title, content or tags did not change
    if (
      note.title === title &&
      note.content === content &&
      String(note.tags.sort()) === String(tags.sort())
    )
      return navigate("../");
      
    updateNote(note._id, { title, content, tags })
      .then((res) => {
        if (res.status === "success") {
          updateOne(res.data._id, res.data);
          console.log(res.data);
          onResponse(true, "Note updated successfuly!");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        onResponse(false, "Could not update note...");
      })
      .finally(() => navigate("../"));
  }

  function handleDeleteNote() {
    deleteNote(note._id)
      .then((res) => {
        if (res.status === "success") {
          updateNotes(res.data);
          onResponse(true, "Note deleted successfuly!");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        onResponse(false, "Could not delete note!");
      });
  }

  return (
    <div className="note-options">
      {/* <Button
        onClick={() => setIsEditing(!isEditing)}
        backgroundColor="#3f84ed"
        backgroundColorHover="#1160d7"
        colorHover="white"
      >
        <FaRegEdit size={23} />
        <span>Edit</span>
      </Button> */}
      <Button
        onClick={handleUpdateNote}
        backgroundColor="#3f84ed"
        backgroundColorHover="#1160d7"
        colorHover="white"
      >
        <LiaSaveSolid size={23} />
        <span>Save</span>
      </Button>
      <Button
        backgroundColor="red"
        backgroundColorHover="#e40000"
        colorHover="white"
        onClick={handleDeleteNote}
      >
        <MdDeleteForever size={23} />
        <span>Delete</span>
      </Button>
    </div>
  );
}
