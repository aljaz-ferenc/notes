import { useEffect } from "react";

export default function useClickOutside(onClickOutside, excludedElements) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      let isOutside = true;

      excludedElements.forEach((el) => {
        if (el.current && el.current.contains(e.target)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        onClickOutside();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [excludedElements, onClickOutside]);
}
