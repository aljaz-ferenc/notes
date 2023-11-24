import "./Tag.scss";
import { IoCloseCircle } from "react-icons/io5";

export default function Tag({ tag, setTags }) {
  function handleremoveTag() {
    setTags((prev) => [...prev.filter((prevTag) => prevTag !== tag)]);
  }

  return (
    <div className="tag">
      <IoCloseCircle onClick={handleremoveTag} size={18} />
      <p>{tag}</p>
    </div>
  );
}
