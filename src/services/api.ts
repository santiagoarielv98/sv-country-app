import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://restcountries.com/v3.1";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "/all",
    }),
  }),
});

export const { useGetCountriesQuery } = api;
