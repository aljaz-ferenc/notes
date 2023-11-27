import { useNavigate, useOutletContext, useParams } from "react-router";
import "./EditNote.scss";
import { createPortal } from "react-dom";
import { useUserContext } from "../../UserContext";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../functions/hooks/useClickOutside";
import NoteOptions from "./NoteOptions";
import Tag from "./Tag";
import { FaCopy } from "react-icons/fa";
import Button from "../ui/Button";
import { getNoteById } from "../../api";
import toast from "react-hot-toast";

export default function EditNote() {
  const { noteId, userId } = useParams();
  const { user } = useUserContext();
  const [note, setNote] = useState(null);

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const editAreaRef = useRef();
  const navigate = useNavigate();
  const contentRef = useRef();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const { setNotes } = useOutletContext();

  //get the note
  useEffect(() => {
    if (!user.id || !userId) return;
    if (user.id === userId) {
      const n = user.notes.find((nte) => nte._id === noteId);
      setNote(n);
    } else {
      getNoteById(noteId)
        .then((res) => {
          if (res.status === "success") {
            setNote(res.data);
          } else {
            throw new Error(res.message);
          }
        })
        .catch((err) => {
          setNotes((prev) => {
            return prev.filter((n) => n._id !== noteId);
          });
          toast.error(err.message);
        });
    }
  }, [user.id, userId, noteId]);

  //set content from note to state
  useEffect(() => {
    if (!note) return;
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }, [note]);

  //resize textarea
  useEffect(() => {
    if (!editAreaRef.current) return;
    resizeContentArea();
  }, [editAreaRef.current]);
  
    function resizeContentArea() {
      contentRef.current.style.height = `${
        contentRef.current.scrollHeight + 3
      }px`;
    }

  useClickOutside(() => navigate("../"), [editAreaRef]);

  function handleContentChange(e) {
    setContent(e.target.value);
    resizeContentArea();
  }

  function handleAddTag(e) {
    e.preventDefault();
    setTags((prev) => Array.from(new Set([...prev, tag])));
    setTag("");
  }

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(content);
    toast.success("Copied!");
  }

  return (
    <>
      {note && (
        <div className="edit-note-container">
          {createPortal(
            <div ref={editAreaRef} className="edit-note">
              <p>By: {user.email}</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="edit-note__title"
                type="text"
                value={title}
              />
              <textarea
                onChange={handleContentChange}
                className="edit-note__content"
                value={content}
                ref={contentRef}
              ></textarea>
              <Button onClick={handleCopyToClipboard}>
                <FaCopy />
                <p style={{ width: "max-content" }}>Copy content</p>
              </Button>
              <form className="edit-note__tags" onSubmit={handleAddTag}>
                <h3>Tags</h3>
                <div>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    placeholder="Add a tag"
                  />
                  <Button type="submit">Add</Button>
                </div>
              </form>
              <div className="edit-note__tags--list">
                {tags.map((tag, i) => (
                  <Tag key={i} setTags={setTags} tag={tag} />
                ))}
              </div>
              <NoteOptions
                note={note}
                title={title}
                content={content}
                tags={tags}
              />
            </div>,
            document.body
          )}
        </div>
      )}
    </>
  );
}
