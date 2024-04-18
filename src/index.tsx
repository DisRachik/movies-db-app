import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import { Home } from "./features";
import { LinearProgress } from "@mui/material";

const Movies = lazy(() => import("./features/Movies/Movies"));
const About = lazy(() => import("./features/About/About"));

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
          element: (
            <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
              <Movies />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
              <About />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/movies-db-app",
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
