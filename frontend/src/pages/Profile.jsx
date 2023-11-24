import "./Profile.scss";
import { useUserContext } from "../UserContext";
import toast, { Toaster } from "react-hot-toast";

import ChangePassForm from "../components/profile/ChangePassForm";
import DeleteAccForm from "../components/profile/DeleteAccForm";

export default function Profile() {
  const { user } = useUserContext();

  function actionFinished(wasSuccessful, message){
    if(wasSuccessful){
      toast.success(message)
    }else{
      toast.error(message)
    }
  }

  return (
    <div className="profile">
      <Toaster/>
      <h2>Your profile</h2>
      <ChangePassForm onResponse={actionFinished}/>
      <DeleteAccForm onResponse={actionFinished}/>
    </div>
  );
}
