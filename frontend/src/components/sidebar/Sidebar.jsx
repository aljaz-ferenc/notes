import "./Sidebar.scss";
import { MdStickyNote2 } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import { useUserContext } from "../../UserContext";

export default function Sidebar() {
  const {user} = useUserContext()
  
  return (
    <aside className="sidebar">
      <SidebarItem
        text={"Notes"}
        icon={<MdStickyNote2 size={23} color="gray" />}
        path={`/user/${user.id}/notes`}
      />
      <SidebarItem
        text={"Profile"}
        icon={<FaUserCircle size={23} color="gray" />}
        path="/profile"
      />
      {user.role === 'admin' && <SidebarItem
        text={"Admin"}
        icon={<MdAdminPanelSettings  size={23} color="gray" />}
        path="/admin"
      />}
    </aside>
  );
}
