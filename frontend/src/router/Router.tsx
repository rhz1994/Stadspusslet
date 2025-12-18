import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import City from "../pages/City";
import Quests from "../pages/Quests";
import QuestPage from "../pages/QuestPage";
import UMLPage from "../pages/UMLPage";

function Router() {
  const router = createHashRouter([
    {
      element: (
        <>
          <Navbar />
          <main className="app-main">
            <Outlet />
          </main>
          <Footer />
        </>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/city/:citySlug", element: <City /> },
        { path: "/city/:citySlug/quests", element: <Quests /> },
        { path: "/quest/:citySlug/:questId", element: <QuestPage /> },
        { path: "/uml/", element: <UMLPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
