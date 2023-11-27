import { useParams } from "react-router";
import "./User.scss";
import { useEffect, useState } from "react";
import { getUser } from "../../api";
import Notes from "../../pages/Notes";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;
    getUser(userId)
      .then((res) => {
        if (res.status === "success") {
          setUser(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err.message));
  }, [userId]);

  return (
    <>
      {user && <div className="user">{user && <Notes userParam={user} />}</div>}
    </>
  );
}
