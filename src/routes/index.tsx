import { createHashRouter } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";

const routes = createHashRouter(
  [
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
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default routes;
