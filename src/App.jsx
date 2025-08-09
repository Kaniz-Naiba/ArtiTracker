import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddArtifact from "./pages/AddArtifact";
import AllArtifacts from "./pages/AllArtifacts";
import MyArtifacts from "./pages/MyArtifacts";
import ArtifactDetails from "./pages/ArtifactDetails"; 
import PrivateRoute from "./routes/PrivateRoute";
import UpdateArtifact from "./pages/UpdateArtifact";
import { ToastContainer } from "react-toastify";
import LikedArtifacts from "./pages/LikedArtifacts";
import "react-toastify/dist/ReactToastify.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      {
        path: "/add-artifact",
        element: (
          <PrivateRoute>
            <AddArtifact />
          </PrivateRoute>
        ),
      },
      
      {
        path: "/my-artifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts/>
          </PrivateRoute>
        ),
      },
      {
        path: "/liked-artifacts",
        element: (
          <PrivateRoute>
            <LikedArtifacts/>
          </PrivateRoute>
        ),
      },

      {
        path: "/all-artifacts",
        element: (
          
            <AllArtifacts/>
          
        ),
      },
      {
  path: "/update-artifact/:id",
  element: (
    <PrivateRoute>
      <UpdateArtifact />
    </PrivateRoute>
  ),
},

      {
        path: "/artifact/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;