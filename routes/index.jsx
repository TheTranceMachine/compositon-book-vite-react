import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContextProvider } from '../src/contexts/ToastContext.jsx';
import { AuthenticationPage } from '../src/AuthenticationPage/AuthenticationPage.jsx';
import { asPage } from '../src/pages/Page';
import ErrorPage from '../src/ErrorPage.jsx';
import Main from '../src/pages/Editor/Main.jsx';
import { NewProject } from '../src/pages/Projects/NewProject';
import { Projects } from '../src/pages/Projects/Projects';
import { Prompt } from '../src/pages/Prompt/Prompt';
import { CustomAlert } from '../src/components/Alert/CustomAlert.jsx';
import { NewCharacter } from '../src/NewCharacter.jsx';
import { NewWorld } from '../src/NewWorld.jsx';

const ProjectsPage = asPage(Projects);
const NewProjectPage = asPage(NewProject);

const fallbackRender = ({ error }) => (
  <CustomAlert heading="Application error" message={error.message} variant="danger" show dismissible={false} />
);

const router = createBrowserRouter([
  {
    path: '/authenticate',
    element: (
      <ErrorBoundary fallbackRender={fallbackRender}>
        <AuthenticationPage />
      </ErrorBoundary>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ToastContextProvider>
            <Main />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'create/character',
        element: <NewCharacter />,
      },
      {
        path: 'create/world',
        element: <NewWorld />,
      },
      {
        path: 'enhance',
        element: <Prompt />,
      },
    ],
  },
  {
    path: '/projects',
    element: (
      <ProtectedRoute>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ToastContextProvider>
            <ProjectsPage />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/projects/new',
    element: (
      <ProtectedRoute>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <ToastContextProvider>
            <NewProjectPage />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
]);

export { router };
