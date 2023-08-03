import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContextProvider } from "../src/contexts/ToastContext.jsx";
import { CustomAlert } from "../src/components/Alert/CustomAlert.jsx";
import App from "../src/App.jsx";
import ErrorPage from "../src/ErrorPage.jsx";
import { Prompt } from "../src/Prompt.jsx";
import { NewCharacter } from "../src/NewCharacter.jsx";
import { NewWorld } from "../src/NewWorld.jsx";
import { AuthenticationPage } from "../src/AuthenticationPage/AuthenticationPage.jsx";

const fallbackRender = ({ error }) => (
  <CustomAlert
    heading="Application error"
    message={error.message}
    variant="danger"
    show
    dismissible={false}
  />
);

const router = createBrowserRouter([
  {
    path: "/authenticate",
    element: (
      <ErrorBoundary fallbackRender={fallbackRender}>
        <AuthenticationPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "create/character",
        element: <NewCharacter />,
      },
      {
        path: "create/world",
        element: <NewWorld />,
      },
      {
        path: "enhance",
        element: <Prompt />,
      },
    ],
  },
]);

export { router };