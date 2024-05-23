import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContextProvider } from '../src/contexts/ToastContext.jsx';
import { AuthenticationPage } from '../src/AuthenticationPage/AuthenticationPage.jsx';
import { asPage } from '../src/pages/Page';
import ErrorPage from '../src/ErrorPage.jsx';
import { Workspace } from '../src/pages/Workspace/Workspace.tsx';
import { NewProject } from '../src/pages/Projects/NewProject';
import { Projects } from '../src/pages/Projects/Projects';
import { Prompt } from '../src/pages/Prompt/Prompt';
import { CustomAlert } from '../src/components/Alert/CustomAlert.jsx';
import { NewWorld } from '../src/NewWorld.jsx';

const ProjectsPage = asPage(Projects);
const projectPageLinks = [{ id: 1, name: 'Projects', link: '/projects' }];

const NewProjectPage = asPage(NewProject);
const newProjectPageLinks = [...projectPageLinks, { id: 2, name: 'New Project', link: '/projects/new' }];

const WorkSpacePage = asPage(Workspace);
const workSpacePageLinks = [...projectPageLinks, { id: 1, name: 'Workspace', link: 'project/workspace' }];

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
            <WorkSpacePage breadcrumbs={workSpacePageLinks} />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
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
            <ProjectsPage breadcrumbs={projectPageLinks} />
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
            <NewProjectPage breadcrumbs={newProjectPageLinks} />
          </ToastContextProvider>
        </ErrorBoundary>
      </ProtectedRoute>
    ),
  },
]);

export { router };
