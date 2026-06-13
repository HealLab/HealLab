import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BeaconPage } from "./pages/BeaconPage";
import { KnotPage } from "./pages/KnotPage";

/** Scroll to top on route change (unless a section scroll was requested). */
function ScrollManager() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if ((state as { scrollTo?: string } | null)?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [pathname, state]);
  return null;
}

function RootLayout() {
  return (
    <>
      <ScrollManager />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/projects", element: <ProjectsPage /> },
        { path: "/projects/beacon", element: <BeaconPage /> },
        { path: "/projects/knot", element: <KnotPage /> },
        { path: "*", element: <HomePage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
