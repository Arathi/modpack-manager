import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Mods from "./pages/mods";
import Root from "./pages/root";
import Modpacks from "./pages/modpacks";
import SearchMods from "./pages/search-mods";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/mods",
        element: <SearchMods />,
      },
      {
        path: "/mods-classic",
        element: <Mods />,
      },
      {
        path: "/modpacks",
        element: <Modpacks />,
      },
    ],
  },
]);

export default routes;
