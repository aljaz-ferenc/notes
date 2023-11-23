import RootLayout from './layouts/RootLayout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import {RouterProvider, createBrowserRouter, redirect} from 'react-router-dom'
import {loader as rootLoader} from './layouts/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <NotFound/>,
    loader: rootLoader,
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
    element: <Login/>,
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
