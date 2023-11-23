import { useState } from "react";
import "./Button.scss";

export default function Button({
  children,
  type = "button",
  onClick,
  color = "white",
  colorHover = 'rgb(30, 30, 30)',
  backgroundColor = "rgb(68, 135, 189)",
  backgroundColorHover = '',
  transition = 'all .2s',
  outline,
}) 
{
  const [bgColor, setBgColor] = useState(backgroundColor)
  const [textColor, setTextColor] = useState(color)

  const style = {
    border: "none",
    cursor: "pointer",
    borderRadius: "20px",
    width: "min-content",
    padding: ".5rem 2rem",
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
    >
      {children}
    </button>
  );
}


