import type { Country } from "@/app/services/api";

export const mockCountries: Country[] = [
  {
    flags: {
      svg: "https://flagcdn.com/gs.svg",
      alt: "",
    },
    name: {
      common: "South Georgia",
      official: "South Georgia and the South Sandwich Islands",
      nativeName: {
        eng: {
          official: "South Georgia and the South Sandwich Islands",
          common: "South Georgia",
        },
      },
    },
    capital: ["King Edward Point"],
    region: "Antarctic",
    subregion: "",
    population: 30,
  },
  {
    flags: {
      svg: "https://flagcdn.com/gd.svg",
      alt: "The flag of Grenada features a large central rectangular area surrounded by a red border, with three five-pointed yellow stars centered on the top and bottom borders. The central rectangle is divided diagonally into four alternating triangular areas of yellow at the top and bottom and green on the hoist and fly sides, and a five-pointed yellow star on a red circle is superimposed at its center. A symbolic nutmeg pod is situated on the green hoist-side triangle.",
    },
    name: {
      common: "Grenada",
      official: "Grenada",
      nativeName: {
        eng: {
          official: "Grenada",
          common: "Grenada",
        },
      },
    },
    capital: ["St. George's"],
    region: "Americas",
    subregion: "Caribbean",
    population: 112519,
  },
];

export const mockCountries2 = [
  {
    name: { common: "Argentina" },
    region: "Americas",
  },
  {
    name: { common: "Brazil" },
    region: "Americas",
  },
  {
    name: { common: "Spain" },
    region: "Europe",
  },
  {
    name: { common: "France" },
    region: "Europe",
  },
  {
    name: { common: "Germany" },
    region: "Europe",
  },
  {
    name: { common: "Italy" },
    region: "Europe",
  },
  {
    name: { common: "Japan" },
    region: "Asia",
  },
  {
    name: { common: "China" },
    region: "Asia",
  },
  {
    name: { common: "India" },
    region: "Asia",
  },
  {
    name: { common: "Australia" },
    region: "Oceania",
  },
  {
    name: { common: "New Zealand" },
    region: "Oceania",
  },
  {
    name: { common: "South Africa" },
    region: "Africa",
  },
  {
    name: { common: "Egypt" },
    region: "Africa",
  },
  {
    name: { common: "Nigeria" },
    region: "Africa",
  },
  {
    name: { common: "Canada" },
    region: "Americas",
  },
  {
    name: { common: "United States" },
    region: "Americas",
  },
];
