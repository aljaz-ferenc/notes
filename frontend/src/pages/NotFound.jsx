import './NotFound.scss'
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useUserContext} from '../UserContext'

export default function NotFound() {
  const [count, setCount] = useState(5);
  const timerRef = useRef();
  const navigate = useNavigate();
  const {user} = useUserContext()

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (count === 0) navigate(`/user/${user.id}/notes`);
  }, [count]);

  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>Seems like the page you're looking for doesn't exist.</p>
      <h2>Redirecting... ({count})</h2>
    </div>
  );
}
