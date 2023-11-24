import "./Header.scss";
import { useUserContext } from "../../UserContext";
import { IoLogOutOutline } from "react-icons/io5";
import Button from "../ui/Button";
import { CgAddR } from "react-icons/cg";
import { useNavigate } from "react-router";
import { createNewNote, logoutUser } from "../../api";

export default function Header() {
  const { user, updateNotes } = useUserContext();
  const navigate = useNavigate()

  function handleNewNote(){
    const noteData = {
      title: 'New Title',
      content: 'New Content',
      tags: []
    }

    createNewNote(noteData)
      .then(res => {
        console.log(res)
        if(res.status === 'success'){
          updateNotes(res.data)
          navigate(`/notes/${res.data.at(-1)._id}`)
        }else{
          throw new Error(res.message)
        }
      })
      .catch(err => console.log(err.message))
  }

  function handleLogout(){
    logoutUser()
      .then(res => {
        if(res.status === 'success'){
          navigate('/login', {replace: true})
        }else{
          throw new Error(res.message)
        }
      })
  }

  return (
    <header className="header">
      <Button
        backgroundColor="green"
        colorHover="white"
        backgroundColorHover="rgb(13, 165, 13)"
        className="header__new-note-btn"
        onClick={handleNewNote}
      >
        <CgAddR size={20} />
        <p>New Note</p>
      </Button>
      <p onClick={() => navigate('/profile')} className="header__email">{user.email}</p>
      <IoLogOutOutline onClick={handleLogout} className="header__logout-btn" size={30} />
    </header>
  );
}
