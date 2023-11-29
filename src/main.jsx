"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import 'bootswatch/dist/sandstone/bootstrap.min.css'; // Using bootswatch theme
// import "bootstrap/dist/css/bootstrap.min.css";
import "split-pane-react/esm/themes/default.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { router } from "../routes/index.jsx";
import "./index.scss";
import "./userWorkers.js"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
