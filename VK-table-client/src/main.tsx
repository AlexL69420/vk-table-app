import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CreateUserForm from "./pages/CreateUserForm.tsx";
import EditUserForm from "./pages/EditUserForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/add-user",
    element: <CreateUserForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/edit-user/:id",
    element: <EditUserForm />,
    errorElement: <NotFoundPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
