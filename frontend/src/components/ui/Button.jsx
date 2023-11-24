import { useState } from "react";
import "./Button.scss";

export default function Button({
  children,
  type = "button",
  onClick,
  color = "white",
  colorHover = 'white',
  backgroundColor = "#3f84ed",
  backgroundColorHover = '#1160d7',
  transition = 'all .2s',
  outline,
  isSubmitting=false
}) 
{
  const [bgColor, setBgColor] = useState(backgroundColor)
  const [textColor, setTextColor] = useState(color)

  const style = {
    border: "none",
    cursor: "pointer",
    borderRadius: "20px",
    width: "min-content",
    padding: ".5rem 1rem",
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    fontSize: '1rem'
  }

  function handleMouseEnter(){
    setBgColor(backgroundColorHover)
    setTextColor(colorHover)
  }

  function handleMouseLeave(){
    setBgColor(backgroundColor)
    setTextColor(color)
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{...style, backgroundColor: bgColor, color: textColor, transition, outline}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="button"
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
}


