import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as rootLoader } from "./layouts/RootLayout";
import EditNote from "./components/notes/EditNote";
import User from "./components/admin/User";
import AdminLayout, { loader } from "./layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    loader: rootLoader,
    children: [
      {
        path: "user/:userId/notes",
        element: <Notes />,
        children: [
          {
            path: ":noteId",
            element: <EditNote />,
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        loader: loader,
        children: [
          {
            path: "users/:userId/notes",
            element: <User />,
            children: [
              {
                path: ":noteId",
                element: <EditNote />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
