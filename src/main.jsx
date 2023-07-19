import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/index.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'split-pane-react/esm/themes/default.css';
import './userWorkers.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
