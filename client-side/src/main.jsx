import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Home, Problem } from "./pages/pages.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Topbar } from "./components/component.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/problems",
        element:<Problem/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);
