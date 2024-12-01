import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  subregion: string;
  capital: string[];
  population: number;
  flags: {
    alt: string;
    svg: string;
  };
}

export const baseUrl = "https://restcountries.com/v3.1";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => "/all?fields=name,region,subregion,capital,population,flags",
    }),
  }),
});

export const { useGetCountriesQuery } = api;
