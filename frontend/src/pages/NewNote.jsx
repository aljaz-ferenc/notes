import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import "./NewNote.scss";
import { useRef, useState } from "react";
import { LiaSaveSolid } from "react-icons/lia";

export default function NewNote() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [title, setTitle] = useState("New Title");
  const [content, setContent] = useState("New Content");

  return (
    <div className="new-note-container">
      <Button
        onClick={() => navigate("../")}
        backgroundColor="#3f84ed"
        backgroundColorHover="#1160d7"
        colorHover="white"
      >
        <LiaSaveSolid size={23} />
        <span>Save</span>
      </Button>
      <div className="new-note">
        <div className="new-note__inputs">
          <input placeholder="New Title" type="text" />
          <textarea rows={20} placeholder="New Content"></textarea>
        </div>
      </div>
    </div>
  );
}
