import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import "./NewNote.scss";
import { LiaSaveSolid } from "react-icons/lia";

export default function NewNote() {
  const navigate = useNavigate();

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
