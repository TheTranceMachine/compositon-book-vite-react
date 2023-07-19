import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import ErrorPage from '../src/ErrorPage.jsx';
import { Prompt } from '../src/Prompt.jsx';
import { NewCharacter } from '../src/NewCharacter.jsx';
import { NewWorld } from '../src/NewWorld.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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