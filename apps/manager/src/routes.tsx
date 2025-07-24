import { createBrowserRouter } from "react-router";
import Home from "./pages/home";
import Mods from "./pages/mods";
import Modpacks from "./pages/modpacks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/mods",
        element: <Mods />
      },
      {
        path: "/modpacks",
        element: <Modpacks />,
      },
    ]
  },
]);

export default routes;
