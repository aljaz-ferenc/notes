import "./Sidebar.scss";
import { MdStickyNote2 } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarItem
        text={"Notes"}
        icon={<MdStickyNote2 size={23} color="gray" />}
        path="/notes"
      />
      <SidebarItem
        text={"Profile"}
        icon={<FaUserCircle size={23} color="gray" />}
        path="/profile"
      />
    </aside>
  );
}
