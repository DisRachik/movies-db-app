import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Home } from "./features";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ErrorBoundary } from "./ErrorBoundary";

const AppEndpoint = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppEndpoint />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          lazy: () => import("./features/Movies/Movies"),
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ],
  {
    basename: "/movies-db",
  }
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
