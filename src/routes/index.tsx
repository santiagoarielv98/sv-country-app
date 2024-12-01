import { createHashRouter } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";

const routes = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        lazy: async () => ({
          Component: (await import("@/features/countries/CountryList")).default,
        }),
      },
      {
        path: "/country/:countryName",
        lazy: async () => ({
          Component: (await import("@/features/countries/CountryDetail")).default,
        }),
      },
    ],
  },
]);

export default routes;
