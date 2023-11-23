import RootLayout from '../layouts/RootLayout'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Notes from '../pages/Notes'
import Profile from '../pages/Profile'
import './App.scss'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <Notes/>,
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: 'login',
    element: <Login/>
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
