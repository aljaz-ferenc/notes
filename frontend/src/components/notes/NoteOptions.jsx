import "./NoteOptions.scss";
import { LiaSaveSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import Button from "../ui/Button";
import { deleteNote, updateNote } from "../../api";
import { useNavigate } from "react-router";
import { useUserContext } from "../../UserContext";
import toast from "react-hot-toast";

export default function NoteOptions({ note, title, content, tags }) {
  const navigate = useNavigate();
  const { updateNotes, updateOne } = useUserContext();

  function actionFinished(wasSuccessful, message) {
    if (wasSuccessful) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

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
          actionFinished(true, "Note updated successfuly!");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        actionFinished(false, err.message);
      })
      .finally(() => navigate("../"));
  }

  function handleDeleteNote() {
    deleteNote(note._id)
      .then((res) => {
        if (res.status === "success") {
          updateNotes(res.data);
          actionFinished(true, "Note deleted successfuly!");
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        actionFinished(false, err.message);
      })
      .finally(() => navigate("../"));
  }

  return (
    <div className="note-options">
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
