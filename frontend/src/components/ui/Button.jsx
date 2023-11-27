import { useState } from "react";
import "./Button.scss";
import { SyncLoader } from "react-spinners";

export default function Button({
  children,
  type = "button",
  onClick,
  color = "white",
  colorHover = "white",
  backgroundColor = "#3f84ed",
  backgroundColorHover = "#1160d7",
  transition = "all .2s",
  outline,
  isSubmitting = false,
  loaderColor = "#1160d7",
}) {
  const [bgColor, setBgColor] = useState(backgroundColor);
  const [textColor, setTextColor] = useState(color);

  function handleMouseEnter() {
    setBgColor(backgroundColorHover);
    setTextColor(colorHover);
  }

  function handleMouseLeave() {
    setBgColor(backgroundColor);
    setTextColor(color);
  }

  return (
    <div className="button-container">
      {isSubmitting ? (
        <SyncLoader className="spinner" color={loaderColor} />
      ) : (
        <button
          type={type}
          onClick={onClick}
          style={{
            backgroundColor: bgColor,
            color: textColor,
            transition,
            outline,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="button"
          disabled={isSubmitting}
        >
          {children}
        </button>
      )}
    </div>
  );
}
