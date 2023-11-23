import React, { useEffect } from 'react'
import { Outlet, redirect, useLoaderData } from 'react-router'
import Sidebar from '../components/Sidebar'
import {verifyUser} from '../api'
import { useUserContext } from '../userContext'

export default function RootLayout() {
  const user = useLoaderData()
  const {updateUser} = useUserContext()
  
  useEffect(() => {
    updateUser(user)
  }, [])

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
        return res.data
    }else{
        return redirect('/login')
    }
}
