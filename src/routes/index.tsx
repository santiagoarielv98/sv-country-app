import { createHashRouter } from "react-router-dom";

import Layout from "../layout/Layout";

const routes = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("../pages/Home")).default,
        }),
      },
      {
        path: "/country/:countryName",
        lazy: async () => ({
          Component: (await import("../pages/Detail")).default,
        }),
      },
    ],
  },
]);

export default routes;
