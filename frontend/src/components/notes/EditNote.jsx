import { useNavigate, useOutletContext, useParams } from "react-router";
import "./EditNote.scss";
import { createPortal } from "react-dom";
import { useUserContext } from "../../UserContext";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../functions/hooks/useClickOutside";
import NoteOptions from "./NoteOptions";
import Tag from "./Tag";

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

  return (
    <>
      {note && (
        <div className="edit-note-container">
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
                <form onSubmit={handleAddTag}>
                  <input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    type="text"
                    placeholder="Add a tag"
                  />
                </form>
                <div className="edit-note__tags">
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
