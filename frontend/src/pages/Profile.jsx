import "./Profile.scss";
import { useUserContext } from "../UserContext";

import ChangePassForm from "../components/profile/ChangePassForm";
import DeleteAccForm from "../components/profile/DeleteAccForm";

export default function Profile() {
  const { user } = useUserContext();

  return (
    <div className="profile">
      <h2>Your profile</h2>
      <ChangePassForm/>
      <DeleteAccForm/>
    </div>
  );
}
