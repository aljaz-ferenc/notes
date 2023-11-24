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
import toast, { Toaster } from "react-hot-toast";

export default function EditNote() {
  const { noteId } = useParams();
  const { user } = useUserContext();
  const note = user.notes.find((note) => note._id === noteId);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const editAreaRef = useRef();
  const navigate = useNavigate();
  const contentRef = useRef();
  const actionFinished = useOutletContext();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!note) return;
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
  }, [note]);

  useEffect(() => {
    if (!editAreaRef.current) return;
    resizeContentArea();
  }, [editAreaRef.current]);

  useClickOutside(() => navigate("../"), [editAreaRef]);

  function handleContentChange(e) {
    setContent(e.target.value);
    resizeContentArea();
  }

  function resizeContentArea() {
    contentRef.current.style.height = `${
      contentRef.current.scrollHeight + 3
    }px`;
  }

  function handleAddTag(e) {
    e.preventDefault();
    setTags((prev) => Array.from(new Set([...prev, tag])));
    setTag("");
  }

  function handleCopyToClipboard(){
    navigator.clipboard.writeText(content)
    toast.success('Copied!')
  }

  return (
    <>
      {note && (
        <div className="edit-note-container">
          <Toaster position="top-center"/>
          {createPortal(
            <div ref={editAreaRef} className="edit-note">
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
                <FaCopy/>
                <p style={{width: 'max-content'}}>Copy content</p>
              </Button>
                <form className="edit-note__tags" onSubmit={handleAddTag}>
                  <h3>Tags</h3>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    placeholder="Add a tag"
                  />
                </form>
                <div className="edit-note__tags--list">
                  {tags.map((tag, i) => (
                    <Tag setTags={setTags} tag={tag} />
                  ))}
                </div>
              <NoteOptions
                onResponse={actionFinished}
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
