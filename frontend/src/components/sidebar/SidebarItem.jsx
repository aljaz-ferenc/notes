import {NavLink} from 'react-router-dom'
import './SidebarItem.scss'

export default function SidebarItem({icon, text, path}) {
  return (
    <NavLink className='sidebar-item' to={path}>
        {icon}
        <p>{text}</p>
    </NavLink>
  )
}
