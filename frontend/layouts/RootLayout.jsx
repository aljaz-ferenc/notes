import React from 'react'
import { Outlet, redirect } from 'react-router'
import Sidebar from '../components/Sidebar'
import {verifyUser} from '../api'

export default function RootLayout() {
  return (
    <div>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export async function loader(){
    const res = await verifyUser()

    if(res.status === 'success'){
        return null
    }else{
        return redirect('/login')
    }
}
