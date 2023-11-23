import { Outlet, redirect} from 'react-router'
import Sidebar from '../components/Sidebar'
import {authenticateUser} from '../api'

export default function RootLayout() {

  return (
    <div>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export async function loader(){
  const res = await authenticateUser()

  if(res.status === 'success'){
    console.log('authenticated')
    return null
  }else{
    console.log(res)
    return redirect('/login')
  }
}